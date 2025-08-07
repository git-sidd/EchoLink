import { Activity, Bell, LogOut } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router'
import useAuthUser from '../hooks/useAuthUser.js'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'

const Navbar = ({ showSidebar }) => {
  const { authUser } = useAuthUser()
  const location = useLocation();
  const currpath = location.pathname

  const navigate = useNavigate()
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/logout");
      return response.date
    },
    onSuccess: (data) => {
      toast.success(data.message)
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login")
    }
  })
  const logoutHandler = () => {
    mutate()
  }

  return (
    <div className='w-full h-12 bg-black flex flex-row justify-between md:justify-end items-center gap-2'>
      <Link to={"/"}>
        <div className='flex justify-start items-center left-0 md:hidden'>
          <Activity className='text-secondary' />
          <span className='text-fuchsia-700 text-xl font-bold'>Echo Link</span>
        </div>
      </Link>
      <div className='flex justify-end items-center gap-4 md:mr-3 mr-2'>
        <Link to={"/notifications"}><Bell className='cursor-pointer' /></Link>
        <img src={authUser?.profilepic} alt="profile pic" className='w-7 h-7 border-2 border-secondary rounded-full' />
        <LogOut onClick={logoutHandler} className='cursor-pointer' />
      </div>
    </div>
  )
}

export default Navbar
