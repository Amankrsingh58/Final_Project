import React, { useState, useEffect } from "react";

function Student() {
  const [tutors, setTutors] = useState([]); 
  const [selectedTutor, setSelectedTutor] = useState(null);

  /*
  useEffect(() => {
    fetch("https://api.example.com/tutors") // Replace with actual API
      .then((response) => response.json())
      .then((data) => setTutors(data))
      .catch((error) => console.error("Error fetching tutors:", error));
  }, []);
  */

  useEffect(() => {
    setTutors([
      {
        id: "853302",
        name: "John Doe",
        experience: "25 years",
        std: "V",
        subject: "Maths",
        phone: "+91 9876543210",
        email: "johndoe@example.com",
        imageUrl:
          "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
      },
    
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "20019",
          experience: "10 year",
          std:"v",
          subject:"maths",
          imageUrl:
            "https://imgs.search.brave.com/bQDraoG_AAPe1jsb6cljXafkoD8bat2uVnM7o2_OMsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IxLndlYnA",
        },
        {
          id: "2022",
          experience: "2 year",
          std:"v",
          subject:"maths",
           imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        
        {
          id: "20019",
          experience: "10 year",
          std:"v",
          subject:"maths",
          imageUrl:
            "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
    ]);
  }, []);

  const deleteTutor = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/tutors/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTutors((prevTutors) => prevTutors.filter((tutor) => tutor.id !== id));
        setSelectedTutor(null); 
      } else {
        console.error("Failed to delete tutor");
      }
    } catch (error) {
      console.error("Error deleting tutor:", error);
    }
  };

  return (
    <div className="w-full h-auto bg-gray-900 min-h-screen text-white p-5">
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold"> Students</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-7 mt-5">
        {tutors.map((tutor, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden sm:min-w-[21%] lg:w-[21%]"
          >
            <img
              src={tutor.imageUrl}
              alt="Tutor"
              className="w-full h-48 object-cover"
            />

            <div className="p-3">
              <p className="font-semibold">Tutor ID: {tutor.id}</p>
              <p>Name: {tutor.name}</p>
              <p>Experience: {tutor.experience}</p>
              <p>Grade: {tutor.std}</p>
              <p>Subjects: {tutor.subject}</p>
            </div>

            <button
              onClick={() => setSelectedTutor(tutor)}
              className="bg-[#1abc9c] hover:bg-[#16a085] text-white w-full py-2 font-semibold"
            >
              Get Contact Info
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 rounded-lg p-5 w-[90%] max-w-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Student Contact Info</h2>
            <p><strong>Name:</strong> {selectedTutor.name}</p>
            <p><strong>Experience:</strong> {selectedTutor.experience}</p>
            <p><strong>Grade:</strong> {selectedTutor.std}</p>
            <p><strong>Subjects:</strong> {selectedTutor.subject}</p>
            <p><strong>Phone:</strong> {selectedTutor.phone}</p>
            <p><strong>Email:</strong> {selectedTutor.email}</p>

           <button
              onClick={() => setSelectedTutor(null)}
              className="bg-gray-600 hover:bg-gray-700 text-white w-full py-2 mt-4 font-semibold"
            >
              Close
            </button>

             <button
                onClick={() => deleteTutor(selectedTutor.id)}
                className="bg-red-500 hover:bg-red-600 text-white mt-2 w-full py-2 font-semibold"
              >
                Delete Tutor
              </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Student;
