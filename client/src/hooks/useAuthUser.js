import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

const useAuthUser = () => {
   const authUser = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
        const res = await axiosInstance.get("/auth/me")
        return res.data;

        },
        retry:false
    });
    return {isLoading:authUser.isLoading,authUser:authUser.data?.user}
}

export default useAuthUser
