import React, { useEffect } from "react";
import Sliderbar from "../components/StudentDashboard/Sliderbar";
import StudentAbout from "../components/StudentDashboard/StudentAbout";
import StudentNotification from "../components/StudentDashboard/studentnotification";
import StudentProfile from "../components/StudentDashboard/studentprofile";
 import Studentdashboardhome from "../components/StudentDashboard/Studentdashboardhome";
 import Studenttutor from "../components/StudentDashboard/Studenttutor";
import { Route,Router,Routes ,useNavigate, } from "react-router-dom";

function StudentDashboard(){
    const Navigate = useNavigate();
useEffect( ()=> {
  Navigate("/studentdashboard/studentdashboardhome");
},[]);
    return(
        <div className="flex h-[100vh] mt-[10vh] ">
            <Sliderbar/>

            <div className="flex-1  text-white bg-green-500 m-[2rem] w-[100%] h-[100%] rounded-md">
            <Routes>
           <Route path="studentdashboardhome" element={<Studentdashboardhome/>} />
          <Route path="studentprofile" element={<StudentProfile />} />
          <Route path="notifications" element={<StudentNotification />} />
          <Route path="tutor" element={<Studenttutor/>} />
          {/* <Route path="*" element={<div>Page not found in Dashboard!</div>} /> */}
           </Routes>

            </div>

           
          
           
        </div>
    )
}
export default StudentDashboard;