import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'

const Notifications = () => {
  const queryClient = useQueryClient()

  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ['friendRequests'],
    queryFn: async () => {
      const response = await axiosInstance.get('/users/get-friend-request')
      return response.data
    },
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: async (requestId) => {
      const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['friendRequests'] })
      queryClient.invalidateQueries({ queryKey: ['friends'] })
    },
  })

  const incomingRequests = friendRequests?.incomingReqs || []

  return (
    <div className='p-4 sm:p-6 lg:p-8 min-h-screen bg-base-100 text-white'>
      <div className='container mx-auto max-w-3xl space-y-10'>
        <h1 className='text-3xl font-bold'>Notifications</h1>

        {isLoading ? (
          <div className='flex justify-center items-center py-20'>
            <span className='loading loading-spinner loading-lg text-primary'></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 ? (
              <section className='space-y-6'>
                <h2 className='text-2xl font-semibold text-gray-300'>Incoming Friend Requests</h2>
                <ul className='space-y-4'>
                  {incomingRequests.map((request) => (
                    <li
                      key={request._id}
                      className='flex items-center justify-between p-4 sm:p-5 rounded-xl shadow-md bg-base-200 border border-base-300'
                    >
                      <div className='flex items-center gap-4'>
                        <img
                          src={request.sender.profilepic}
                          alt="profile"
                          className='w-12 h-12 rounded-full object-cover border-2 border-primary'
                        />
                        <div>
                          <p className='text-lg font-medium text-white'>
                            {request.sender.fullname}
                          </p>
                          <p className='text-sm text-gray-400'>
                            {request.sender.nativelanguage} ➝ {request.sender.learninglanguage}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => acceptRequestMutation(request._id)}
                        disabled={isPending}
                        className='btn btn-primary px-4 py-2 disabled:opacity-50'
                      >
                        {isPending ? 'Accepting...' : 'Accept'}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : (
              <div className='text-center text-gray-400 mt-10'>
                No incoming friend requests at the moment.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Notifications
