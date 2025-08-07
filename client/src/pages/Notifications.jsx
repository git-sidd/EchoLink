import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'
const Notifications = () => {
  const queryClient=useQueryClient()
  const {data:friendRequests,isLoading}=useQuery({
    queryKey:["friendRequests"],
    queryFn:async()=>{
      const response=await axiosInstance.get("/users/get-friend-request");
      return response.data;
    }
  })
  const {mutate:acceptRequestMutation,isPending}=useMutation({
    mutationFn:async(requestId)=>{
      const response=await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
      return response.data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({queryKey:["friendRequests"]})
      queryClient.invalidateQueries({queryKey:["friends"]})
    }
  })

  const incomingRequests=friendRequests?.incomingReqs||[]
  const acceptedRequests=friendRequests?.acceptedReqs||[]
  return (
    <div>
      Notifications
    </div>
  )
}

export default Notifications
