import React, { useState } from "react";
import{FaTh,FaUserAlt,FaRegChartBar,FaComment ,FaBars}from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sliderbar.css"
const Sliderbar = ({children})=>{
  const [isOpen ,setIsOpen]=useState(false)
  const toggle =()=> setIsOpen(!isOpen)
  const menuItems=[
    {
      path:"/",
      name:"Dashboard",
      icon:<FaTh/>
    },
    {
      path:"/studentdashboard/About",
      name:"about",
      icon:<FaUserAlt/>
    },
    {
      path:"/studentdashboard/notification",
      name:"notification",
      icon:<FaComment/>
    },
    {
      path:"/tutor",
      name:"tutor",
      icon:<FaRegChartBar/>
    },
  ]
return(
  <div className="container">
    <div  style={{width:isOpen ? "300px":"50px"}} className="sliderbar">
      <div  className="top-section">
<h1  className="logo"> Logo</h1>
<div className="bars">
  <FaBars onClick={toggle}/>
</div>

</div>
 
 {
menuItems.map((item,index)=>(
  <NavLink to ={item.path} key={index} className="link"activeclassName="active">
    <div className="icon">{item.icon}</div>
    <div className="link_text">{item.name}</div>
   
  </NavLink>
))
 }
      </div> 
      <main>{children}</main>
</div>
  
);
};
export default Sliderbar;