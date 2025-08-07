import React, { useEffect, useState } from 'react';
import useAuthUser from '../hooks/useAuthUser.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios.js';
import { Link } from "react-router";
import FriendCard from '../components/FriendCard.jsx';
import NoFriendYet from '../components/NoFriendYet.jsx';
import NoRecommendedUser from '../components/NoRecommendedUser.jsx';
import { CheckCircleIcon, MapPinIcon, UserPlusIcon } from 'lucide-react';

const Homepage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set());

  const { data:frndData, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/myfriends");
      return response.data;
    }
  });

  const friends = Array.isArray(frndData?.friends) ? frndData.friends : [];

  const { data:userData, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/");
      return response.data;
    },
    retry:false
  });
  const recommendedUsers=Array.isArray(userData?.recommendedUser) ? userData.recommendedUser : [];

  const { data: outgoingFriendReqs , isLoading: OutgoingFriendReqsLoading } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: async () => {
      const response = await axiosInstance.get("/users/get-outgoing-friend-request");
      return response.data;
    }
  });
  const outgoingFriendReq=Array.isArray(outgoingFriendReqs?.outgoingReqs) ? outgoingFriendReqs.outgoingReqs : [];

  const { mutate: sendRequestMutation, isPending: sendRequestLoading } = useMutation({
    mutationFn: async (userId) => {
      const response = await axiosInstance.post(`users/friend-request/${userId}`);
      return{data: response.data,userId};
    },
    onSuccess: ({userId}) => {
      // Immediately add to the set
      setOutgoingRequestIds(prev => new Set(prev).add(userId));
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] });// Then re-fetch from backend too
    }
  });

  

  return (
 <div className='text-white px-4 py-6 max-w-6xl mx-auto overflow-y-scroll'>

  {/* Header */}
  <div className='flex items-center justify-between mb-8'>
    <h2 className='text-2xl font-bold'>Your Friends</h2>
    <Link
      to={"/notifications"}
      className='border border-purple-400 text-purple-400 px-4 py-1 rounded-full hover:bg-purple-600 hover:text-white transition duration-300'
    >
      Friend Requests →
    </Link>
  </div>

  {/* Friend List or NoFriendYet */}
  {loadingFriends ? (
    <div className='flex justify-center items-center min-h-[150px]'>
      <span className='text-gray-400'>Loading friends...</span>
    </div>
  ) : friends.length === 0 ? (
    <NoFriendYet />
  ) : (
    <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  )}

  {/* Meet New Learners Section */}
  <section className='mt-12'>
    <div className='mb-8 '>
      <h2 className='text-2xl font-bold mb-1'>Meet New Learners</h2>
      <p className='text-gray-400'>Discover perfect language exchange partners based on your profile</p>
    </div>

    {loadingUsers ? (
      <div className='flex justify-center items-center min-h-[150px]'>
        <span className='loading loading-spinner loading-lg' />
      </div>
    ) : recommendedUsers.length === 0 ? (
      <NoRecommendedUser />
    ) : (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {recommendedUsers.map((user) => {
          const hasRequestBeenSent = outgoingRequestIds.has(user._id);
          return (
            <div key={user._id} className='bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300'>
              <div className='p-5 space-y-4'>

                {/* Profile Section */}
                <div className='flex items-center gap-4'>
                  <img
                    src={user.profilepic}
                    alt={user.fullname}
                    className='w-14 h-14 rounded-full object-cover border border-gray-400'
                  />
                  <div>
                    <h3 className='font-semibold text-lg'>{user.fullname}</h3>
                    {user.location && (
                      <div className='flex items-center text-xs text-gray-400 mt-1'>
                        <MapPinIcon className='size-4 mr-1' />
                        {user.location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Languages */}
                <div className='flex justify-between text-sm text-gray-300'>
                  <span><strong>Native:</strong> {user.nativelanguage}</span>
                  <span><strong>Learning:</strong> {user.learninglanguage}</span>
                </div>

                {/* Bio */}
                {user.bio && (
                  <p className='text-sm text-gray-400'>{user.bio}</p>
                )}

                {/* Send Request Button */}
                <button
                  className={`btn w-full mt-2 ${hasRequestBeenSent ? "btn-disabled bg-gray-500 text-white" : "btn-primary"}`}
                  onClick={() => sendRequestMutation(user._id)}
                  disabled={hasRequestBeenSent || sendRequestLoading}
                >
                  {hasRequestBeenSent ? (
                    <>
                      <CheckCircleIcon className='size-4 mr-2' />
                      Request Sent
                    </>
                  ) : (
                    <>
                      <UserPlusIcon className='size-4 mr-2' />
                      Send Friend Request
                    </>
                  )}
                </button>

              </div>
            </div>
          );
        })}
      </div>
    )}
  </section>
</div>

  );
};

export default Homepage;
