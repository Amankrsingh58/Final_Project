import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiHomeFill } from "react-icons/ri";
import { FaUser, FaBell, FaCog, FaChalkboardTeacher, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import "./Slidebar.css";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";


const Sidebar = () => {
  const [isExpand, setIsExpand] = useState(true);
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      dispatch(setLogout()); 
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('user');
      await logout().unwrap(); 
      navigate('/login'); 
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };


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
<div className={isExpand ? "stsidebar stExpand" : "stsidebar stnotExpand"}>
<div className="logo">
        {isExpand && <h2 className=" font-bold">{user.role}</h2>}
        {!isExpand &&<GiHamburgerMenu className="stmenu-toggle" onClick={toggleSidebar} />}
        {isExpand && <IoClose className="stmenu-toggle" onClick={toggleSidebar} />}
      </div>

      <ul className="stmenu">
        {/* <li>
          <NavLink
            to="/userdashboard"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >  
            <RiHomeFill className="icon" />
            {isExpand && <span>Dashboard</span>}
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/userdashboard/profile"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaUser className="icon" />
            {isExpand && <span>Profile</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <SiHomeassistantcommunitystore  className="icon" />
            {isExpand && <span>My Booking</span>}
          </NavLink>
        </li>
        <li>{user.role === "Tutor" ?
          <NavLink
            to="/userdashboard/students"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaUserGraduate className="icon" />
            {isExpand && <span>Students</span>}
          </NavLink>
          :
          <NavLink
            to="/userdashboard/tutors"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaChalkboardTeacher  className="icon"/>
            {isExpand && <span>Tutors</span>}
          </NavLink>
        }</li>
        <li>
          <NavLink
            to="/userdashboard/notifications"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaBell className="icon" />
            {isExpand && <span>Notifications</span>}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/userdashboard/usersetting"
            className={({ isActive }) => (isActive ? " bg-[#d8d9e5b3]" : "")}
          >
            <FaCog className="icon" />
            {isExpand && <span>Settings</span>}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
