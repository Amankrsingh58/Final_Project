import React from "react";
import sliderbar from "../components/StudentDashboard/Sliderbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./DashBoard";
import StudentAbout from "../components/StudentDashboard/StudentAbout";
import TutorDashboard from "../components/TutorDashboard";
import Tutor from "./Tutor";
import Notification from "../components/StudentDashboard/Notification";
import Profile from "../components/Dashboard/Profile";
import Sliderbar from "../components/StudentDashboard/Sliderbar";
function StudentDashboard(){
return(

    <div>
     <Sliderbar/>
     
       
       
        <Routes>
            <Route path="/dashboard"element={<DashBoard/>}/>
            <Route path="/about"element={<StudentAbout/>}/>
            <Route path="/notifiction"element={<Notification/>}/>
            <Route path="/profile"element={<Profile/>}/>
            <Route path="/profile"element={<Tutor/>}/>
        </Routes>
      
       
  
    </div>
  

)
}
export default StudentDashboard;