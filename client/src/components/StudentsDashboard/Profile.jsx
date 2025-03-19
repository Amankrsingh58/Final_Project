import React, { useState, useEffect } from "react";
import axios from "axios";
import {useGetProfileQuery, useUpdateProfileMutation} from '../../features/auth/profileApi'

const Profile = () => {
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userData ? userData.profile : {});

  // const [error, setError] = useState("");
  const [image, setImage] = useState("https://via.placeholder.com/100");
  
//redux ka logic
  const { data: profileData, error, isLoading, isError } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      try {
        const parsedToken = JSON.parse(token);
        setUser(parsedToken);
      } catch (error) {
        console.error("Error parsing user token:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  useEffect(() => {
    if (profileData && profileData.profile) {
      setUserData(profileData.profile);
      setLoading(false);
      // setImage(profileData.profile.image || image); // Set initial image if available
    }
  }, [profileData]);


  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const updatedProfile = {
          ...profile, // updated profile data
          // image: image, // if you changed the image
        };
        const response = await updateProfile({ id: profileData.profile._id, profile: updatedProfile }).unwrap();
  
        if (response) {
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert(error.message)
      }
    }
    setIsEditing(!isEditing);
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    if (!e.target.files?.length) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/users/upload-image',
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setImage(response.data.imageUrl);
      // setError("");
    } catch (error) {
      // setError("Failed to upload image");
      // console.error("Error uploading image:", error);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  // console.log(userData)

  return (
    <div className="h-auto max-w-4xl mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>

      <div className="bg-white p-6 rounded-lg shadow-md relative border border-gray-200">
        <button
          onClick={handleEditToggle}
          className="absolute top-4 right-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>

        <div className="flex items-start gap-6">
          <div className="flex flex-col items-center">
            <label className="cursor-pointer relative group">
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
              />
              <img
                src={user.image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover transition-transform group-hover:opacity-80"
              />
              <span className="absolute bottom-0 right-0 bg-white text-gray-700 text-xs px-2 py-1 rounded-full shadow-sm">
                Change
              </span>
            </label>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{user.userName}</h3>
            <p className="text-gray-600">{user.role}</p>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userData && Object.entries(userData).map(([key, value]) => {
          if (key === "refreshToken" || key === "__v" || key === "_id" ||
              key === "createdAt" || key === "updatedAt" || key==='review' || key === "userId" ) return null;
            return (
              <div key={key} className="w-full bg-gray-100 flex gap-2 items-center pl-1">
                <label className="block text-gray-800 font-medium  capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    // value={value}
                    defaultValue={value}
                    onChange={handleChange}
                    className="w-full p-2 border-1 text-gray-700 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
    
                  <p className="text-gray-800 py-2">: {Array.isArray(value) ? value.join(", ") : value}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
