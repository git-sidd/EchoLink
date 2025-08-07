import React from 'react';
import useAuthUser from "../hooks/useAuthUser.js";
import { Link, useLocation } from "react-router";
import { Activity } from 'lucide-react';

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currpath = location.pathname;

  return (
    <aside className="min-h-screen w-64 bg-base-200 border-r border-base-300 hidden md:flex lg:flex flex-col sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-base-300 flex items-center space-x-3">
        <Activity className="text-secondary " />
        <Link to="/" className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-1 text-center drop-shadow-lg">
          Echo Link
        </Link>
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col px-4 py-6 space-y-2 text-base font-medium text-base-content">
        <li>
          <Link
            to="/"
            className={`block px-4 py-2 rounded-md hover:bg-base-300 ${
              currpath === '/' ? 'bg-base-300 font-semibold' : ''
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/friends"
            className={`block px-4 py-2 rounded-md hover:bg-base-300 ${
              currpath === '/friends' ? 'bg-base-300 font-semibold' : ''
            }`}
          >
            Friends
          </Link>
        </li>
        <li>
          <Link
            to="/notifications"
            className={`block px-4 py-2 rounded-md hover:bg-base-300 ${
              currpath === '/notifications' ? 'bg-base-300 font-semibold' : ''
            }`}
          >
            Notifications
          </Link>
        </li>
      </ul>

       <div className="p-4 border-t border-base-300 mt-auto">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="w-10 h-10 rounded-full border-success border-3">
              <img src={authUser?.profilepic} alt="User Avatar" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col">
            <p className="font-semibold text-sm capitalize">{authUser?.fullname}</p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-success inline-block"></span>
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
