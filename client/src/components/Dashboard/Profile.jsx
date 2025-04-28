import React, { useState, useEffect } from "react";
import axios from "axios";
import {useGetProfileQuery, useUpdateProfileMutation, useUploadImageMutation} from '../../features/auth/profileApi'
import toast from "react-hot-toast";

const Profile = () => {
  const [file, setFile] = useState(null);
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

  const [uploadImage] = useUploadImageMutation();

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
    setLoading(true);
    if (profileData && profileData.profile) {
      setUserData(profileData.profile);
      setLoading(false);
    }
  }, [profileData]);

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {  
      alert('File size exceeds 5MB');
      return;
    }

    setFile(selectedFile);

    const formData = new FormData();
    formData.append('imageFile', selectedFile);

    const toastId = toast.loading("Uploading...")
    try {
      const result = await uploadImage(formData).unwrap();
      toast.success("Updated Successful!",{id:toastId})
      if (result?.user?.image) {
        setUser((prev) => ({ ...prev, image: result.user.image }));
      }
    } catch (error) {
      toast.error(error.message || 'Faild to Update', {id:toastId})
      setLoading(false)

      console.error("Error uploading image:", error);
    }
      setTimeout( () => toast.dismiss(toastId), 2000);
    
    
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

      <h2 className="text-2xl font-bold mb-6 text-gray-100">My Profile</h2>

      <div className="bg-gray-800 p-6 rounded-lg shadow-md relative border border-gray-500">

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
                src={userData.image}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-gray-200 object-cover transition-transform group-hover:opacity-80"
              />
              <span className="absolute bottom-0 right-0 bg-white text-gray-700 text-xs px-2 py-1 rounded-full shadow-sm">
                Change
              </span>
            </label>
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-100">{user.userName}</h3>
            <p className="text-gray-100">{user.role}</p>
            <p className="text-gray-100">{user.email}</p>
          </div>
        </div>
      </div>

  
    </div>
  );
};

export default Profile;
