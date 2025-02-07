import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const WorkFlowCard = () => {
    const Navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const handleClick = () => {
      if (isLoggedIn) {
        setShowModal(true); // Show modal if the user already posted
      } else {
        Navigate("/signup"); // Navigate to signup if not logged in or no post
      }
    };
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
        <h1 className="w-full pb-8 font-bold text-[2rem] font-robotoSlab text-center">Welcome To Sunny Tution Finder !</h1>
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
              <button onClick={handleClick} className="bg-custom-blue text-white font-semibold font-Roboto text-[14px] py-2 px-4 rounded hover:bg-[#133b80] transition">
                {item.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
         {/* Modal for already posted users */}
         {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[90%] max-w-md text-center">
            <h2 className="text-2xl font-bold text-white">Alert</h2>
            <p className="mt-3 text-white">You have already posted!</p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 px-5 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkFlowCard;
