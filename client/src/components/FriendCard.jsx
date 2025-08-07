import React from 'react';

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-white text-black rounded-2xl shadow-md p-4 flex flex-col items-center space-y-4 hover:shadow-lg transition-shadow duration-300">
      {/* Profile Pic + Full Name */}
      <div className="flex flex-col items-center">
        <img
          src={friend.profilepic}
          alt={friend.fullname}
          className="w-20 h-20 rounded-full object-cover border-2 border-purple-500"
        />
        <h3 className="mt-2 text-lg font-semibold">{friend.fullname}</h3>
      </div>

      {/* Languages */}
      <div className="flex justify-between w-full px-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Native:</span> {friend.nativelanguage}
        </div>
        <div>
          <span className="font-medium">Learning:</span> {friend.learninglanguage}
        </div>
      </div>

      {/* Message Button */}
      <button className="mt-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition-colors duration-200">
        Message
      </button>
    </div>
  );
};

export default FriendCard;
