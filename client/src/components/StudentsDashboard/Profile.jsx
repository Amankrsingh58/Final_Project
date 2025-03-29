import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGetProfileQuery, useUpdateProfileMutation, useUploadImageMutation } from "../../features/auth/profileApi";
import toast from "react-hot-toast";

const Profile = () => {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({});
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(userData ? userData.profile : {});
  const [image, setImage] = useState("https://via.placeholder.com/100");

  const { data: profileData, error, isLoading } = useGetProfileQuery();
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

  const handleEditToggle = async () => {
    if (isEditing) {
      const toastId = toast.loading("Updating...");
      try {
        const updatedProfile = { ...profile };
        const response = await updateProfile({ id: profileData.profile._id, profile: updatedProfile }).unwrap();
        if (response) {
          setUserData(response.data);
          toast.success("Updated Successfully!", { id: toastId });
        }
      } catch (error) {
        toast.error(error.message || "Failed to Update", { id: toastId });
      } finally {
        setTimeout(() => toast.dismiss(toastId), 2000);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB");
      return;
    }

    setFile(selectedFile);
    const formData = new FormData();
    formData.append("imageFile", selectedFile);

    const toastId = toast.loading("Uploading...");
    try {
      const result = await uploadImage(formData).unwrap();
      toast.success("Image Updated!", { id: toastId });
      if (result?.user?.image) {
        setUser((prev) => ({ ...prev, image: result.user.image }));
      }
    } catch (error) {
      toast.error(error.message || "Failed to Update", { id: toastId });
    } finally {
      setTimeout(() => toast.dismiss(toastId), 2000);
    }
  };

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="h-auto min-h-screen max-w-4xl mx-auto px-2 pb-3">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">My Profile</h2>
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row items-center sm:items-start">
        <label className="cursor-pointer relative group w-32 h-32 sm:w-40 sm:h-40 flex-shrink-0">
          <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
          <img src={userData.userId?.image || image} alt="Profile" className="w-full h-full rounded-full border-2 border-gray-200 object-cover" />
        </label>
        <div className="flex-1 mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
          <h3 className="text-xl font-semibold text-gray-800">{user.userName}</h3>
          <p className="text-gray-600">{user.role}</p>
          <p className="text-gray-600">{user.email}</p>
          <button onClick={handleEditToggle} className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors">
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>
      <div className="mt-8 bg-white p-2 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-800 text-center sm:text-left">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userData && Object.entries(userData).map(([key, value]) => {
            if (["refreshToken", "__v", "_id","pasword", "createdAt", "updatedAt", "review", "userId"].includes(key)) return null;
            return (
              <div key={key} className="w-full bg-gray-100 flex gap-2 items-center p-2 rounded-md">
                <label className="block text-gray-800 font-medium capitalize w-1/3">{key.replace(/([A-Z])/g, " $1").trim()}</label>
                {isEditing ? (
                  <input type="text" name={key} defaultValue={value} onChange={handleChange} className="w-2/3 p-2 border text-gray-800 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                ) : (
                  <p className="text-gray-800 py-2 w-2/3">{Array.isArray(value) ? value.join(", ") : value}</p>
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
