import React from "react";
import pic from '../Images/pic.png';
import './Container.css'
import WorkFlowCard from "./WorkFlowCard";
import Designcard from "./Designcard";

import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

function Container(){
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    msg: "",
   
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Send Data to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/enquiries",
        formData
      );
      alert(response.data.message); // Show success message
      setShowModal(false); // Close modal
    } catch (error) {
      console.error("Error submitting enquiry:", error);
      alert("Failed to submit enquiry. Try again!");
    }
  };
    return(
<div className="demo-container w-full">
 {/* <img src={pic}alt="picture"/> */}
 <WorkFlowCard/>
 
 <div className="demo">

 <p className="text text-center">Not sure? Take a free online counselling <br/>
  and clear your confusions.</p>
 <button 
 onClick={() => setShowModal(true)}
 className="button">DROP YOUR ISSUE HERE !</button>
 </div>
 <Designcard/>

 {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl text-white font-bold text-center">Help Form</h2>

            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="subject"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

              <input
                type="textarea"
                name="msg"
                placeholder="messages..."
                value={formData.msg}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

            

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
</div>
    );
}
export default Container;