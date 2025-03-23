import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentsDashboard from "./pages/StudentsDashboard";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Tutor from "./pages/Tutor";
import Notfound from "./pages/Notfound";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/DashBoard";
import TutorDetail from "./pages/TutorDetail";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";
import Student from "./pages/Student";
import { useDispatch, useSelector } from "react-redux";
import { useVerifyTokenExpiryQuery } from "./features/auth/userApi";
import { setLogout } from "./features/auth/authSlice";
import { useEffect } from "react";
import StudentDetail from "./pages/StudentDetails";
import { Toaster } from "react-hot-toast";
import Bookings from "./pages/Bookings";




function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token,isLoading, isAuthenticated } = useSelector((state) => state.auth);



  

  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute allowedRoles={"Admin"} />}>
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Route>        

        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        
        <Route element={<ProtectedRoute allowedRoles={["Student","Tutor","Admin"]} />}>
        <Route path="/tutor/:id" element={<TutorDetail />} />
        <Route path="/student/:id" element={<StudentDetail />} />
        <Route path="/tutordetail" element={<TutorDetail />} />
        <Route path="/my-bookings" element={<Bookings />} />

        <Route element={<ProtectedRoute allowedRoles={["Student","Tutor"]} />}>
        <Route path="/userdashboard/*" element={<StudentsDashboard/>} />
        </Route>

        </Route> 
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
