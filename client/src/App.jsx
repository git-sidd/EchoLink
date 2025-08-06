import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Homepage from './pages/Homepage.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Chat from './pages/Chat.jsx'
import Call from './pages/Call.jsx'
import Onboarding from './pages/Onboarding.jsx'
import {Toaster} from "react-hot-toast";
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios"
import { axiosInstance } from './lib/axios.js'
import Notifications from './pages/Notifications.jsx'
import PageLoader from './components/PageLoader.jsx'

const App = () => {
  const {data:authData,isLoading,isError}=useQuery({
    queryKey:["authUser"],
    queryFn:async()=>{
      
      const res=await axiosInstance.get("/auth/me")
     
      return res.data;
      
    },
    
  });
  const authUser=authData?.user;
  //if(isLoading)return <PageLoader/>
  return (
    <div className='h-screen'>
      
     
      <Routes>
          <Route path='/' element={authUser?<Homepage/>:<Navigate to={"/login"}/>}/> 
          <Route path='/login' element={!authUser?<Login/>:<Navigate to={"/"}/>}/> 
          <Route path='/signup' element={!authUser?<Signup/>:<Navigate to={"/"}/>}/> 
          <Route path='/chat' element={authUser?<Chat/>:<Navigate to={"/login"}/>}/> 
          <Route path='/notifications' element={authUser?<Notifications/>:<Navigate to={"/login"}/>}/> 
          <Route path='/call' element={authUser?<Call/>:<Navigate to={"/login"}/>}/> 
          <Route path='/onboarding' element={authUser?<Onboarding/>:<Navigate to={"/login"}/>}/> 
      </Routes>
      <Toaster></Toaster>
    </div>
  )
}

export default App
