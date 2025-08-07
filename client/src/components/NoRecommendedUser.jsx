import React from 'react'
import { UserX2 } from 'lucide-react'; 
const NoRecommendedUser = () => {
  return (
    
    <div className="flex bg-gray-900 rounded-2xl flex-col items-center justify-center h-full text-center p-6">
          <UserX2 className="w-12 h-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700">No Recommended User Found</h2>
          <p className="text-sm text-gray-500 mt-2">
             Check back later for new language partners!
          </p>
        </div>
    
  )
}

export default NoRecommendedUser
