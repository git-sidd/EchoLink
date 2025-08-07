import React from 'react';

const FriendCard = ({ friend }) => {
  return (
    <div className="bg-base-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="p-5 space-y-4">

        {/* Profile Section */}
        <div className="flex flex-col items-center gap-3">
          <img
            src={friend.profilepic}
            alt={friend.fullname}
            className="w-20 h-20 rounded-full object-cover border border-gray-400"
          />
          <h3 className="font-semibold text-lg text-white">{friend.fullname}</h3>
        </div>

        {/* Languages */}
        <div className="flex justify-between text-sm text-gray-300">
          <span><strong>Native:</strong> {friend.nativelanguage}</span>
          <span><strong>Learning:</strong> {friend.learninglanguage}</span>
        </div>

        {/* Bio (Optional) */}
        {friend.bio && (
          <p className="text-sm text-gray-400">{friend.bio}</p>
        )}

        {/* Message Button */}
        <div className="mt-4">
          <button className="btn btn-primary w-full">
            Message
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default FriendCard;
