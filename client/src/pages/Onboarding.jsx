import React, { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser.js'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Globe, LucideImagePlus } from 'lucide-react';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router';

const Onboarding = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [random,setRandom]=useState(3)
  const [formState, setFormState] = useState({
    fullname: authUser?.fullname || "",
    bio: authUser?.bio || "",
    nativelanguage: authUser?.nativelanguage || "",
    learninglanguage: authUser?.learninglanguage || "",
    location: authUser?.location || "",
    profilepic: authUser?.profilepic || ""
  })
  const navigate=useNavigate();
  const queryCLient=useQueryClient();

  const{mutate,isPending,error,isSuccess}=useMutation({
    mutationFn:async()=>{
      const response=await axiosInstance.post("/auth/onboard",formState);
      return response.data;
    },
    onSuccess:(data)=>{
      toast.success(data.message);
      queryCLient.invalidateQueries({queryKey:["authUser"]});
      navigate("/");
    }
  })


  const submitHandler=(e)=>{
    e.preventDefault();
    mutate()
  }


  const generaterandom=()=>{
     const num= Math.floor(Math.random() * 100) + 1;
     setRandom(num);
  }
  return (
 <div className="flex flex-col items-center justify-center min-h-screen  p-4" data-theme="forest" >
  <div className=" rounded-3xl shadow-xl p-8 w-full max-w-lg " data-theme="cupcake">
    {/* Top Section */}
    <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-4 text-center drop-shadow-lg">
      Complete Your Profile
    </h1>
    <div className="flex flex-col items-center mb-6">
      <img
        src={`https://avatar.iran.liara.run/public/${random}`}
        alt="profile"
        className="w-24 h-24 rounded-full border-4 border-pink-400 shadow-md mb-2"
      />
      <button
        onClick={generaterandom}
        type="button"
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow hover:scale-105 transition"
      >
        <LucideImagePlus />
        <span>Generate Random Avatar</span>
      </button>
    </div>
    {error &&(<span className="alert alert-error">{error.response.data.message}</span>)}
    <form onSubmit={submitHandler} className="space-y-4">
      <div>
        <label htmlFor="fullname" className="block font-semibold text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formState.fullname}
          onChange={(e) => setFormState({ ...formState, fullname: e.target.value })}
          className="input input-bordered w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />
      </div>
      <div>
        <label htmlFor="bio" className="block font-semibold text-gray-700 mb-1">
          Bio
        </label>
        <input
          type="text"
          id="bio"
          name="bio"
          value={formState.bio}
          onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
          className="input input-bordered w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>
      <div className="flex flex-row gap-4">
        <div className="w-1/2">
          <label htmlFor="nativelanguage" className="block font-semibold text-gray-700 mb-1">
            Native Language
          </label>
          <select
            name="nativelanguage"
            id="nativelanguage"
            value={formState.nativelanguage}
            onChange={(e) => setFormState({ ...formState, nativelanguage: e.target.value })}
            className="input input-bordered w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="">Select your native language</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="marathi">Marathi</option>
            <option value="punjabi">Punjabi</option>
            <option value="gujarathi">Gujarathi</option>
            <option value="telgu">Telgu</option>
            <option value="tamil">Tamil</option>
            <option value="urdu">Urdu</option>
          </select>
        </div>
        <div className="w-1/2">
          <label htmlFor="learninglanguage" className="block font-semibold text-gray-700 mb-1">
            Learning Language
          </label>
          <select
            name="learninglanguage"
            id="learninglanguage"
            value={formState.learninglanguage}
            onChange={(e) => setFormState({ ...formState, learninglanguage: e.target.value })}
            className="input input-bordered w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Select language you're learning</option>
            <option value="english">English</option>
            <option value="hindi">Hindi</option>
            <option value="marathi">Marathi</option>
            <option value="punjabi">Punjabi</option>
            <option value="gujarathi">Gujarathi</option>
            <option value="telgu">Telgu</option>
            <option value="tamil">Tamil</option>
            <option value="urdu">Urdu</option>
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="location" className="block font-semibold text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formState.location}
          onChange={(e) => setFormState({ ...formState, location: e.target.value })}
          className="input input-bordered w-full rounded-xl px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center gap-2 w-full py-3 mt-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold shadow hover:scale-105 transition"
      >
        <Globe />
        <span>Complete Onboarding</span>
      </button>
    </form>
  </div>
</div>
  )
}

export default Onboarding
