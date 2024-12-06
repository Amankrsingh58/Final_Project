

import React from "react";

const Studentprofile = () => {
  return (


        // BHAI PURA CHAT GPT DIKH RAHA HAI TO WAH 



    <div>
    <div className="min-h-screen bg-white text-white flex flex-col items-center py-10 ">
      {/* Profile Header */}
      <div className="w-full bg-custom-blue rounded-lg p-6 mb-6 flex justify-between items-center">
        <div className="flex items-center">
          {/* Profile Icon */}
          <div className="w-12 h-12 bg-custom-blue rounded-full flex items-center justify-center text-xl font-bold">
           S
          </div>
          {/* Profile Info */}
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Student name</h2>
            <p className="text-sm text-gray-400">student email</p>
          </div>
        </div>
        {/* Edit Button */}
        <button className="bg-yellow-400 text-black rounded-md px-4 py-2 text-sm font-bold hover:bg-yellow-500">
          Edit
        </button>
      </div>

      {/* About Section */}
      <div className="w-full  bg-custom-blue rounded-lg p-6 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">About</h3>
          <p className="text-sm text-gray-400">Write Something about Yourself</p>
        </div>
        {/* Edit Button */}
        <button className="bg-yellow-400 text-black rounded-md px-4 py-2 text-sm font-bold hover:bg-yellow-500">
          Edit
        </button>
      </div>
   
  
          <div className="w-full max-w-6xl bg-custom-blue rounded-lg p-6 mt-7">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Personal Details</h2>
            <button className="bg-yellow-400 text-black rounded-md px-4 py-2 text-sm font-bold hover:bg-yellow-500">
              Edit
            </button>
          </div>
          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column */}
            <div>
              <p className="text-sm text-gray-400">First Name</p>
              <p className="text-base font-semibold">enter first name</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Last Name</p>
              <p className="text-base font-semibold">enter last name</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-base font-semibold">Add email</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone Number</p>
              <p className="text-base font-semibold">Add Contact Number</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Gender</p>
              <p className="text-base font-semibold">Add Gender</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Date of Birth</p>
              <p className="text-base font-semibold">Add Date of Birth</p>
            </div>
          </div>
          </div>
        </div>
        </div>
       
);
};

export default Studentprofile;
