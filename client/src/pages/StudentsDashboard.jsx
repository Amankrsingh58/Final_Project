import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/StudentsDashboard/Slidebar";
import StudentsDashboardHome from "../components/StudentsDashboard/StudentsDashboardHome";
import Notifications from "../components/Dashboard/Notifications";
import SettingsPage from "../components/StudentsDashboard/setting";
import "./DashBoard.css";
import Tutor from "../components/Dashboard/Tutors";
import { CiSearch } from "react-icons/ci";
import Student from "../components/Dashboard/Student";
import Profile from "../components/StudentsDashboard/Profile";

const DashBoard = () => {
  const handleSearch = (query) => {
    console.log("Search Query:", query);
    // Add search logic here
  };
const Navigate = useNavigate();
// useEffect( ()=> {
//   Navigate("/dashboard/dashboardhome", { replace: true });
// },[]);

  return (
    <div className="flex h-auto mt-[10vh] overflow-x-hidden">
      <Sidebar />
      <div className="bg-gray-100 dashboard-content overflow-x-hidden overflow-y-scroll">

        {/* <div
        className="flex items-center p-[0.5rem] lg:w-[60%] sm:w-[100%] md:w-[60%] text-black bg-[#fff] rounded-md  border-1 border-[#D8D8D8]"
        >
          <CiSearch className="text-black" />
        <input
        className="p-[0.2rem] bg-transparent border-none w-[100%]"
        type="text"
        placeholder="Search here.."
        />

        </div> */}
        

          <Routes>
          <Route path="/" element={<StudentsDashboardHome />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tutors" element={<Tutor />} />
          <Route path="students" element={<Student />} />
          <Route path="usersetting" element={<SettingsPage/>} />
          <Route path="*" element={<div>Page not found in Dashboard!</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
