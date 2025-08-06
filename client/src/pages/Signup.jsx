import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate()
  const [tick, setTick] = useState(false);
  const [submitted, setSubmitted] = useState(false)
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
 
  const queryClient = useQueryClient();
  const { mutate, isPending, error, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/auth/signup", signupData);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/onboarding");
    }
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true)
    if (tick) {
      mutate();
    }



  };
  return (
    <div className="h-screen flex flex-col md:flex-row items-center md:justify-center justify-center-safe md:p-12 overflow-hidden ">
      {/* Left Part */}
      <Toaster />
      <div className="w-full md:w-1/2 space-y-6 md:px-10 p-4 ">
        <div className="text-center md:text-left">
          <h1
              className="text-5xl  mt-2 font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-700 via-pink-400 to-pink-800 drop-shadow-lg tracking-wide"
            >
            Echo Link
          </h1>
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <p className="text-gray-600">
            Join LangConnect and start your language learning journey
          </p>
        </div>
        {error && (<span className="alert alert-error">{error.response.data.message}</span>)

        }
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control flex flex-col gap-2">
            <label htmlFor="fullname" className="label">
              <span className="label-text ml-1">Full Name</span>
            </label>

            <input
              type="text"
              id="fullname"
              name="fullname"
              value={signupData.fullname}
              onChange={(e) => setSignupData({ ...signupData, fullname: e.target.value })}
              className="input input-bordered w-full rounded-3xl"
              required
            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label htmlFor="email" className="label">
              <span className="label-text ml-1">Email</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={signupData.email}
              required
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              className="input input-bordered w-full rounded-3xl"

            />
          </div>

          <div className="form-control flex flex-col gap-2">
            <label htmlFor="password" className="label">
              <span className="label-text ml-1">Password</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={signupData.password}
              required
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              className="input input-bordered w-full rounded-3xl"
            />
            <p className="text-sm text-gray-500 mt-1">
              Password must be minimum 6 characters
            </p>
          </div>

          <div>
            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" className="checkbox" onClick={() => setTick(!tick)} />
              <p className="text-sm">
                I agree to the{" "}
                <span className="text-pink-600 font-medium cursor-pointer">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-pink-600 font-medium cursor-pointer">
                  privacy policy
                </span>
              </p>
            </div>
            {(!tick && submitted) ? <p className="text-red-700 ml-1"> accept the terms and policies</p> : ""}
          </div>


          <button
            type="submit"
            className="btn btn-secondary w-full mt-2 rounded-3xl"
          >
            {!isPending ? "Create Account" : <span className="loading loading-spinner"><p>Registering..</p></span>}
          </button>

          <p className="text-center text-sm ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-pink-600 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {/* Right Part */}
      <div className="hidden w-full md:w-1/2 md:gap-2 md:flex md:flex-col  md:px-10  justify-center">
        <img src="/signup.png" alt="Signup Illustration" className="h-[500px]" />
        <h2 className="text-2xl text-center">Connect with language Partners worldwide</h2>
        <p className="text-center">practice conversation,make friends, and improve your language skills together</p>
      </div>
    </div>
  );
};

export default Signup;
