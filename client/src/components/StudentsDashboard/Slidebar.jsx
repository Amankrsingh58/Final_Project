import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiHomeFill } from "react-icons/ri";
import { FaUser, FaBell, FaCog, FaChalkboardTeacher, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
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
    <div className={isExpand ? "stsidebar border-r-2 border-[#BEBEBE] overflow-x-hidden" : "stsidebar stnotExpand overflow-x-hidden"}>
      <div className="logo">
        {isExpand && <h2 className=" font-bold">Admin</h2>}
        <GiHamburgerMenu className="stmenu-toggle" onClick={toggleSidebar} />
      </div>

      <ul className="stmenu">
        <li>
          <NavLink
            to="/studentsdashboard"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >  
            <RiHomeFill className="icon" />
            {isExpand && <span>Dashboard</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studentsdashboard/profile"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaUser className="icon" />
            {isExpand && <span>Profile</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studentsdashboard/my-booking"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <SiHomeassistantcommunitystore  className="icon" />
            {isExpand && <span>My Booking</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studentsdashboard/students"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaUserGraduate className="icon" />
            {isExpand && <span>Students</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studentsdashboard/notifications"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaBell className="icon" />
            {isExpand && <span>Notifications</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/studentsdashboard/usersetting"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaCog className="icon" />
            {isExpand && <span>Settings</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/logout"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
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
