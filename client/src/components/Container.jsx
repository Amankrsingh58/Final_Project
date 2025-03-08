import React, { useState } from "react";
import pic from "../Images/pic.png";
import "./Container.css";
import WorkFlowCard from "./WorkFlowCard";
import Designcard from "./Designcard";
import axios from "axios"; // Import Axios

function Container() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
    setSuccess(null);
  };

  // Handle form submission (Send Data to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      
      const response = await axios.post(
        "http://localhost:6001/api/users/submithelpform",
        { subject: formData.subject, message: formData.message }, // Correct keys
        { withCredentials: true,
          headers: { "Content-Type": "application/json" }

         }, // Send cookies (token)
        
      );

      setSuccess("Help request submitted successfully!");
      alert(response.data.message);
      setShowModal(false); // Close modal
      setFormData({ subject: "", message: "" }); // Reset form
    } catch (error) {
      setError("Failed to submit. Try again.");
      alert("Error submitting help request:", error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-container w-full">
      <WorkFlowCard />

      <div className="demo">
        <p className="text text-center">
          Not sure? Take a free online counseling <br />
          and clear your confusions.
        </p>
        <button onClick={() => setShowModal(true)} className="button">
          DROP YOUR ISSUE HERE!
        </button>
      </div>

      <Designcard />

      {/* Help Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-2xl text-white font-bold text-center">Help Form</h2>

            <form onSubmit={handleSubmit} className="mt-4">
              <input
                type="text"
                name="subject"
                placeholder="Enter subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 mt-2 bg-gray-700 text-white rounded"
                required
              />

              <textarea
                name="message"
                placeholder="Enter your message..."
                value={formData.message}
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
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>

            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {success && <p className="text-green-500 text-center mt-2">{success}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Container;
