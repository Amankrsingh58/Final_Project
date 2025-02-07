import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios

  
  const RegisterCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    grade: "",
    subjects: "",
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
        onClick={() => setShowModal(true)}
         className="bg-custom-blue text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#133b80] transition">
          ENQUIRE NOW
        </button>
        <p className="text-sm text-custom-blue mt-4">
          TERMS & CONDITIONS.
        </p>
      </div>
     </div>

     {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl text-white font-bold text-center">Enquiry Form</h2>

            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={formData.grade}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

              <input
                type="text"
                name="subjects"
                placeholder="Subjects Interested"
                value={formData.subjects}
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
};

export default RegisterCard;
