import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Sidebar from "../components/StudentsDashboard/Slidebar";
import StudentsDashboardHome from "../components/StudentsDashboard/StudentsDashboardHome";
import Notifications from "../components/StudentsDashboard/Notifications";
import SettingsPage from "../components/StudentsDashboard/setting";
import "./DashBoard.css";
import Tutor from "./Tutor";
import { CiSearch } from "react-icons/ci";
import Student from "./Student";
import Profile from "../components/StudentsDashboard/Profile";
import Bookings from "./Bookings";

const DashBoard = () => {
  const handleSearch = (query) => {
    console.log("Search Query:", query);
  };
const Navigate = useNavigate();
// useEffect( ()=> {
//   Navigate("/dashboard/dashboardhome", { replace: true });
// },[]);

  return (
    <div className="flex pb-10 lg-pb-0  mt-[64px] fixed w-screen" style={{ height: 'calc(100vh - 64px)' }}>
      <Sidebar />
      <div className="bg-gray-100 h-auto dashboard-content flex-grow w-full overflow-x-hidden">

          <Routes>
          <Route path="/" element={<StudentsDashboardHome />} />
          <Route path="profile" element={<Profile/>} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tutors" element={<Tutor/>} />
          <Route path="my-bookings" element={<Bookings/>} />
          <Route path="students" element={<Student/>} />
          <Route path="usersetting" element={<SettingsPage/>} />
          <Route path="*" element={<div>Page not found in Dashboard!</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
