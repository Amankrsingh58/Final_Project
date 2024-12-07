import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const WorkFlowCard = () => {
    const Navigate = useNavigate();
  const data = [
    {
      title: "Parents",
      description:
        "Give us your learning needs and our team will quickly find the well-qualified and experienced tutor who makes learning a fun-filled process.",
      buttonText: "POST YOUR REQUIREMENT",
      image: "https://apnahometuition.com/images/course_2.jpg", 
    },
    {
      title: "Tutors",
      description:
        "Register as Tutor & Showcase your talent and expertise to Students & Earn extra money. If you have the passion to teach & learn.",
      buttonText: "SUBMIT YOUR PROFILE",
      image: "https://apnahometuition.com/images/course_1.jpg",
    },
    {
      title: "Current Vacancies",
      description:
        "We provide exciting Home Tuition Jobs in Academics for KG-12th & Co-Curricular Tuition also, tons of opportunities waiting for you.",
      buttonText: "APPLY FOR VACANCIES",
      image: "https://plus.unsplash.com/premium_photo-1661344287754-5b54e8feb18b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    },
  ];

  return (
    <div className="bg-gray-200 py-10 px-6">
        <h1 className="w-full pb-8 font-bold text-[2rem] text-center">Welcome To Sunny Tution Finder !</h1>
      <div className="max-w-7xl mx-auto grid gap-6 lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button onClick={ ()=> Navigate("/signup")} className="bg-custom-blue text-white font-semibold font-Roboto text-[14px] py-2 px-4 rounded hover:bg-[#133b80] transition">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkFlowCard;
