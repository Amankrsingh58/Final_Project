import React from "react";
import{FaTh,FaUserAlt,FaRegChartBar,FaComment ,FaBars}from "react-icons/fa";
import { NavLink } from "react-router-dom";
function Sliderbar({chidren}){
  const menuItems=[
    {
      path:"/",
      name:"Dashboard",
      icon:<FaTh/>
    },
    {
      path:"/about",
      name:"about",
      icon:<FaUserAlt/>
    },
    {
      path:"/notification",
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
    <div className="sliderbar">
      <div className="top-section">
<h1 className="logo"> Logo</h1>
<div className="bars">
  <FaBars/>
</div>

</div>
{
menuItems.map((item,index)=>{
<NavLink to={item.path} key={index} className="link" activeclassName="active">
   <div className="icon">{item.icon}</div>
   <div className="link-text">{item.name}</div>

</NavLink>
})

}
      </div> 
      <main>{chidren}</main>
</div>
  
)
}
export default Sliderbar;