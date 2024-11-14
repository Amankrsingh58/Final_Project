import logo from './logo.svg';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import DashBoard from './pages/DashBoard';
import Services from './pages/Services';
import Notfound from './pages/Notfound';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/dashboard" element={<DashBoard/>}/>
      <Route path="/services" element={<Services/>}/>
      <Route path="*" element={<Notfound/>}/>
     </Routes>
    </div>
  );
}

export default App;
