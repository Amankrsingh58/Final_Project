import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const RegisterCard = () => {
    const Navigate = useNavigate();
  return (
    <div
      className="flex justify-center items-center lg:h-screen sm:h-auto bg-cover bg-center bg-no-repeat bg-slate-400"
      style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1682787494765-44d02d12f5be?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
     <div className="w-[100%] h-[100%] bg-gray-300 bg-opacity-70  bg-center flex justify-center items-center">
     <div className="  rounded-lg p-6 md:p-8  text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-custom-blue mb-4">
          Register as a Tuition Teacher
        </h1>
        <p className="text-black mb-6">
          Looking for some home tuition jobs and to make some extra income in Patna?
        </p>
        <button
        onClick={()=> Navigate("/signup")}
         className="bg-custom-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#133b80] transition">
          ENQUIRE NOW
        </button>
        <p className="text-sm text-custom-blue mt-4">
          TERMS & CONDITIONS.
        </p>
      </div>
     </div>
    </div>
  );
};

export default RegisterCard;
