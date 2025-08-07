import React from 'react';
import { UserX2 } from 'lucide-react'; // Optional: adds icon for visual appeal

const NoFriendYet = () => {
  return (
    <div className="flex bg-gray-900 rounded-2xl flex-col items-center justify-center h-full text-center p-6">
      <UserX2 className="w-12 h-12 text-gray-400 mb-4" />
      <h2 className="text-xl font-semibold text-gray-700">No Friends Yet</h2>
      <p className="text-sm text-gray-500 mt-2">
        Start connecting with people to see your friends here.
      </p>
    </div>
  );
};

export default NoFriendYet;
