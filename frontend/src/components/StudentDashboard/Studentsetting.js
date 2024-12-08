import React from "react";

function Studentsetting(){
    return(
      <div className="">
      <div className="">
            <div className="w-full  bg-blue-600 text-white rounded-lg shadow-md p-6 max-w-[700px]">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold">
                      S
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="bg-yellow-400 px-4 py-2 rounded text-sm">Select</button>
                      <button className="bg-yellow-400 px-4 py-2 rounded text-sm">Upload</button>
                    </div>
                  </div>
                </div>
                </div>
                 <div className="mt-4 bg-blue-600 rounded-lg p-6 trxt-white max-w-[700px]">
                <form className="space-y-2">
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label htmlFor="firstName" className="block text-sm text-white-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        className="w-full text-white-700 text-white rounded p-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="lastName" className="block text-sm text-white-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        className="w-full text-white-700text-white rounded p-2 focus:outline-none"
                      />
                    </div>
                  </div>
        
            
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label htmlFor="dob" className="block text-sm text-white-700 mb-1">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        id="dob"
                        className="w-full bg-blue-700 text-white rounded p-2 focus:outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="gender" className="block text-sm text-white-700 mb-1">
                        Gender
                      </label>
                      <select
                        id="gender"
                        className="w-full bg-blue-700 text-white rounded p-2 focus:outline-none"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>
        
                 
                  <div >
                    <label htmlFor="contactNumber" className="block text-sm text-white-700 mb-1">
                      Contact Number
                    </label>
                    <input
                      type="text"
                      id="contactNumber"
                      placeholder="Enter Contact Number"
                      className="w-full text-white-700 text-black rounded p-2 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="about" className="block text-sm text-white-700 mb-1">
                      About
                    </label>
                    <textarea
                      id="about"
                      placeholder="Enter Bio Details"
                      className="w-full text-white-700 text-black rounded p-2 focus:outline-none"
                      rows="1"
                    ></textarea>
                  </div>
                </form>
                </div>
                <button className="bg-yellow-400 p-2 rounded mt-1">Save Changes</button>
                </div> 
                <div className="bg-blue-600 p-4 rounded mt-5 max-w-[700px]">
                <div>
                    <label htmlFor="Old password" className="block text-sm text-white-700 mb-1">
                    Old password
                    </label>
                    <textarea
                      id="about"
                      placeholder="Enter your Old Password"
                      className="w-full text-white-700 text-black rounded p-2 focus:outline-none"
                      rows="1"
                    ></textarea>
                  </div>
                <div>
                    <label htmlFor="New password" className="block text-sm text-white-700 mb-1">
                      New Password
                    </label>
                    <textarea
                      id="New password"
                      placeholder="Enter your new password"
                      className="w-full text-white-700 text-black rounded p-2 focus:outline-none"
                      rows="1"
                    ></textarea>
                  </div>
                <div>
                    <label htmlFor="confirm New password" className="block text-sm text-white-700 mb-1">
                     Confirm New password
                    </label>
                    <textarea
                      id="confirm new password"
                      placeholder="Enter confirmed password"
                      className="w-full text-white-700 text-black rounded p-2 focus:outline-none"
                      rows="1"
                    ></textarea>
                  </div>
                  
                  
                </div>
                <button className="bg-yellow-400 p-2 rounded mt-1">Save Changes</button>
                </div>
              
                   
        
    );
}
export default Studentsetting;