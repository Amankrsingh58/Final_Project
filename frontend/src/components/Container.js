import React from "react";
import pic from "../Images/pic.png";

function Container() {
  return (
    <div className="mt-8 bg-pink-50 h-[150vh] sm:h-[92vh] flex flex-col items-center">
      <img 
        src={pic} 
        alt="picture" 
        className="w-auto h-auto mb-4"
      />
      <div className="flex flex-col items-center justify-center gap-9 h-[78vh]">
        <p className="text-2xl sm:text-3xl text-gray-600 font-semibold font-poppins text-center">
          Not sure? Take a free online counselling class from 
          <span className="text-[#806868] font-semibold"> GharPeShiksha</span> <br />
          and clear your confusions.
        </p>
        <button className="rounded-full px-8 py-4 sm:px-16 sm:py-3 bg-blue-600 text-white text-xl sm:text-2xl font-bold hover:bg-blue-700 transition">
          BOOK YOUR FREE DEMO
        </button>
      </div>
    </div>
  );
}

export default Container;
