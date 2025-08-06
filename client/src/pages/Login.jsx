import React from 'react'
import { Link } from 'react-router';
const Login = () => {
  return (
    <div>
      <div className="h-screen flex flex-col md:flex-row items-center md:justify-center justify-center-safe md:p-12 overflow-hidden ">

        {/* Left Part */}
        <div className="w-full md:w-1/2 space-y-6 md:px-10 p-4 ">
          <div className="text-center md:text-left">
            <h1
              className="text-5xl  mt-2 font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r  from-pink-700 via-pink-400 to-pink-800 drop-shadow-lg tracking-wide"
            >
              Echo Link
            </h1>
            <h2 className="text-2xl font-semibold">Login to an Account</h2>
            <p className="text-gray-600">Join LangConnect and start your language learning journey</p>
          </div>

          <form className="space-y-4 md:w-[90%]">


            <div className="form-control flex flex-col gap-2">
              <label htmlFor="email" className="label">
                <span className="label-text ml-1">Email</span>
              </label>
              <input type="email" id="email" name="email" className="input input-bordered w-full rounded-3xl" />
            </div>

            <div className="form-control flex flex-col gap-2">
              <label htmlFor="password" className="label">
                <span className="label-text ml-1">Password</span>
              </label>
              <input type="password" id="password" name="password" className="input input-bordered w-full rounded-3xl mb-2" />

            </div>

            <div className="flex items-start gap-2 mt-2">
              <input type="checkbox" className="checkbox" />
              <p className="text-sm">
                I agree to the <span className="text-pink-600 font-medium cursor-pointer">terms of service</span> and{' '}
                <span className="text-pink-600 font-medium cursor-pointer">privacy policy</span>
              </p>
            </div>

            <button type="submit" className="btn btn-secondary w-full mt-4 rounded-3xl">
              Login
            </button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{' '}
              <Link to="/signup" className="text-pink-600 font-medium hover:underline">
                SignUp
              </Link>
            </p>
          </form>
        </div>

        {/* Right Part */}
        <div className="hidden w-full md:w-1/2 md:gap-2 md:flex md:flex-col  md:px-10  justify-center">
          <img src="/login.png" alt="Signup Illustration" className="h-[500px]" />
          <h2 className="text-2xl text-center">Connect with language Partners worldwide</h2>
          <p className="text-center">practice conversation,make friends, and improve your language skills together</p>
        </div>
      </div>
    </div>
  )
}

export default Login
