import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/Dashboard/Slidebar";
import DashboardHome from "../components/Dashboard/DashboardHome";
import Profile from "../components/Dashboard/Profile";
import Notifications from "../components/Dashboard/Notifications";
import SettingsPage from "../components/Dashboard/setting";
import "./DashBoard.css";
import Tutor from "../components/Dashboard/Tutors";
import { CiSearch } from "react-icons/ci";
import Student from "../components/Dashboard/Student";

const DashBoard = () => {
  const handleSearch = (query) => {
    console.log("Search Query:", query);
    // Add search logic here
  };
const Navigate = useNavigate();
useEffect( ()=> {
  Navigate("/dashboard/dashboardhome");
},[]);

  return (
    <div className="flex h-screen mt-[10vh]">
      <Sidebar />
      <div className="dashboard-content">

        <div
        className="flex items-center p-[0.5rem] lg:w-[60%] sm:w-[100%] md:w-[60%] bg-[#21222D] rounded-md border-none"
        >
          <CiSearch />
        <input
        className="p-[0.2rem] bg-transparent border-none w-[100%]"
        type="text"
        placeholder="Search here.."
        />

        </div>
        

            <Routes>
          <Route path="dashboardhome" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tutors" element={<Tutor />} />
          <Route path="students" element={<Student />} />
          <Route path="adminsetting" element={<SettingsPage/>} />
          <Route path="*" element={<div>Page not found in Dashboard!</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
