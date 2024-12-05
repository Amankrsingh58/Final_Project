import React, { useEffect } from "react";
import Sliderbar from "../components/StudentDashboard/Sliderbar";
import StudentAbout from "../components/StudentDashboard/StudentAbout";
import StudentNotification from "../components/StudentDashboard/studentnotification";
import StudentProfile from "../components/StudentDashboard/Studentprofile";
 import Studentdashboardhome from "../components/StudentDashboard/Studentdashboardhome"
import { Route,Router,Routes ,useNavigate, } from "react-router-dom";

function StudentDashboard(){
    const Navigate = useNavigate();
useEffect( ()=> {
  Navigate("/Studentdashboard/Studentdashboardhome");
},[]);
    return(
        <div>
            <Sliderbar/>
          
           <Routes>
           <Route path="./Studentdashboardhome" element={<Studentdashboardhome/>} />
           <Route path="./About" element={<StudentAbout/>} />
          <Route path="./studentprofile" element={<StudentProfile />} />
          <Route path="notifications" element={<StudentNotification />} />
          {/* <Route path="tutors" element={<Tutor />} /> */}
          <Route path="*" element={<div>Page not found in Dashboard!</div>} />
           </Routes>
           
          
           
        </div>
    )
}
export default StudentDashboard;