import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Dashboard/Slidebar";
import DashboardHome from "../components/Dashboard/DashboardHome";
import Profile from "../components/Dashboard/Profile";
import Notifications from "../components/Dashboard/Notifications";
import "./DashBoard.css";
import Tutor from "./Tutor";

const DashBoard = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h2>Welcome to the DashBoard Admin</h2>
        <Routes>
        <Route index element={<DashboardHome />} />
          <Route path="dashboardhome" element={<DashboardHome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tutors" element={<Tutor />} />
          <Route path="*" element={<div>Page not found in Dashboard!</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
