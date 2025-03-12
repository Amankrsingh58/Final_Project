import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  // const API_URL = process.env.URL;
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [image, setImage] = useState("https://via.placeholder.com/100");

  // useEffect(() => {
  //   fetchProfile();
  // }, []);

  // const fetchProfile = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/profile`);
  //     setProfile(response.data);
  //     setImage(response.data.image || "https://via.placeholder.com/100");
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //   }
  // };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await axios.put(`${API_URL}/profile`, profile);
        // fetchProfile();
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        const response = await axios.post(`${API_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setImage(response.data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const [user,setUser]= useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user"));
    console.log(token.role);

   if (token) {setUser(token)}
   
   }, []);

  return (
    <div className="h-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-600">My Profile</h2>
      <div className="bg-[#fff] p-4 rounded-md shadow-sm relative border-1 border-[#D8D8D8]">
        <button
          onClick={handleEditToggle}
          className="absolute top-2 right-2 px-4 py-2 bg-blue-400 text-white rounded-md"
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <div className="flex items-center gap-4">
          <label className="cursor-pointer relative">
            <input
              type="file"
              className="hidden"
              onChange={handleImageChange}
              accept="image/*"
            />
            <img
              src={image}
              width={200}
              height={200}
              alt="Profile"
              className="w-20 h-20 rounded-full border-2 border-gray-300"
            />
            <span className="absolute bottom-0 right-0 bg-white text-gray-600 text-xs px-2 py-1 rounded">Change</span>
          </label>
          <div>
            <h3 className="text-xl text-gray-600 font-semibold">{user.userName}</h3>
            <p className=" text-gray-600">{user.role}</p>
            <p className=" text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-[#fff] p-4 rounded-md shadow-sm text-gray-600">
        <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
        <div className="flex justify-between flex-col gap-6">
          {Object.entries(user).map(([key, value]) => (
            key !== "refreshToken" && key !== "__v" && key !== "_id" && (
              <div key={key} className="w-1/2 text-gray-600">
                <label className="block text-gray-600 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="text-gray-800 lg:w-full p-2 border rounded-md"
                  />
                  
                ) : (
                  <p className="text-gray-600">{value}</p>
                )}
                
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
