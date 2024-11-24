import React, { useState,useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import Dropdown from './Dropdown';
import { toast } from "react-toastify";

export default function Navbar({ isLoggedIn, setisaLoggesIn }) {
  const [dropdown, setDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);


  const serviceDropdown = [
    
    { id: 1, title: "About", path: "/about", cName: "s-item" },
    { id: 2, title: "Contact Us", path: "/contact", cName: "s-item" },
  ];

  const serviceDropdown2 = [
    { id: 1, title: "As Student", path: "/signup", cName: "s-item" },
    { id: 2, title: "As Tutor", path: "/signup", cName: "s-item" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const clickHandler = () => {
    setisaLoggesIn(true);
    toast.success("Signed In");
  };

  const clickHandler2 = () => {
    setisaLoggesIn(true);
  };

  return (
<div className={`navbar ${isScrolled ? "box scrolled" : "box"}`}>
<Link to="/" className="logo">LOGO</Link>

      <ul className="navitem">
        <li>
          <Link to="/">One-2-One-Class</Link>
        </li>
        <li>
          <Link to="/tutor">Top Tutors</Link>
        </li>
        <li>
          <Link to="/">Students</Link>
        </li>
        <li>
          <Link to="/">Online Class</Link>
        </li>
        <li
          onMouseEnter={() => setDropdown("serviceDropdown")}
          onMouseLeave={() => setDropdown(null)}
        >
          {dropdown === "serviceDropdown" && (
            <Dropdown serviceDropdown={serviceDropdown} />
          )}
          <Link className="cursor" to="">
            More <FaChevronDown />
          </Link>
        </li>
      </ul>


      <ul className="auth">
        {!isLoggedIn && (
          <>
            <Link to="/login">
             Login
            </Link>
            <Link to="/signup">
            <li
          onMouseEnter={() => setDropdown("serviceDropdown2")}
          onMouseLeave={() => setDropdown(null)}
        >
          {dropdown === "serviceDropdown2" && (
            <Dropdown serviceDropdown={serviceDropdown2} />
          )}
          <Link className="cursor" to="">
            Sign Up <FaChevronDown />
          </Link>
        </li>            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link to="/">
              <button
                onClick={() => {
                  setisaLoggesIn(false);
                  toast.success("Logged Out");
                }}

     >
                Logout
              </button>
            </Link>
            <Link to="/">
              <button>Dashboard</button>
            </Link>
          </>
        )}
        
      </ul>
    </div>
  );
}
