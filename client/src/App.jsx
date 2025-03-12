import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import StudentsDashboard from "./pages/StudentsDashboard";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Tutor from "./pages/Tutor";
import Student from "./pages/Student";
import Notfound from "./pages/Notfound";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/DashBoard";
import TutorDetail from "./pages/TutorDetail";
import ProtectedRoute from "./components/Dashboard/ProtectedRoute";

// import StudentDashboard from "./pages/StudentDashboard";



function App() {
  const Navigate = useNavigate();

  return (
    <div className="App">
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
        {/* <Route path="/studentdashboard/*" element={<StudentDashboard />} /> //temporary banane ke liye */}
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/student" element={<Student />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/tutordetail" element={<TutorDetail />} />
        <Route path="/student" element={<Student />} />
        <Route path="/studentsdashboard/*" element={<StudentsDashboard/>} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
