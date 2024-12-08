import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiHomeFill } from "react-icons/ri";
import { FaUser, FaBell, FaCog, FaChalkboardTeacher, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import "./Slidebar.css";

const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(true);


useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth < 600) { 
      setIsExpand(false); 
    }
  };

  window.addEventListener('resize', handleResize);

  handleResize();

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

  const toggleSidebar = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div className={isExpand ? "sidebar" : "sidebar notExpand"}>
      <div className="logo">
        {isExpand && <h2 className=" font-bold">Admin</h2>}
        <GiHamburgerMenu className="menu-toggle" onClick={toggleSidebar} />
      </div>

      <ul className="menu">
        <li>
          <NavLink
            to="/dashboard/dashboardhome"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >  
            <RiHomeFill className="icon" />
            {isExpand && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUser className="icon" />
            {isExpand && <span>Profile</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/tutors"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaChalkboardTeacher className="icon" />
            {isExpand && <span>Tutors</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/students"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaUserGraduate className="icon" />
            {isExpand && <span>Students</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/notifications"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaBell className="icon" />
            {isExpand && <span>Notifications</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/adminsetting"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaCog className="icon" />
            {isExpand && <span>Settings</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            <FaSignOutAlt className="icon" />
            {isExpand && <span>Signout</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
