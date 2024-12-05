import React, { useState } from "react";
import{FaTh,FaUserAlt,FaRegChartBar,FaComment ,FaBars}from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sliderbar.css"
const Sliderbar = ({children})=>{
  const [isOpen ,setIsOpen]=useState(true)
  const toggle =()=> setIsOpen(!isOpen)
  const menuItems=[
    {
      path:"/studentdashboard",
      name:"Dashboard",
      icon:<FaTh/>
    },
    {
      path:"/studentdashboard/Studentprofile",
      name:"Profile",
      icon:<FaUserAlt/>
    },
    {
      path:"/studentdashboard/notification",
      name:"notification",
      icon:<FaComment/>
    },
    {
      path:"studentdashboard/tutor",
      name:"tutor",
      icon:<FaRegChartBar/>
    },
  ]
return(
  <div className="container">
    <div  style={{width:isOpen ? "300px":"50px"}} className="sliderbar">
      <div  className="top-section flex justify-center items-center m-2">{
        isOpen &&
<h1  className="logo1 font-bold text-[1.5rem]  mr-[12rem]"> Logo</h1>
}
<div className="bars text-[1.5rem] ">
  <FaBars onClick={toggle}/>
</div>

</div>
 
 {
menuItems.map((item,index)=>(
  <NavLink to ={item.path} key={index} className="link"activeclassName="active">
    <div className="icon">{item.icon}</div>
    <div className="link_text">{isOpen && item.name}</div>
   
  </NavLink>
))
 }
      </div> 
      <main className="flex-1 p-[2rem] text-white bg-green-500 m-[2rem]">{children}</main>
</div>
  
);
};
export default Sliderbar;