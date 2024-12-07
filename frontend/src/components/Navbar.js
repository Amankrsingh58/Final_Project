import React, { useState,useEffect, useContext } from 'react';
import './Navbar.css';
import { Link ,useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import Dropdown from './Dropdown';
import { toast } from "react-toastify";
import { AuthContext } from '../hooks/AuthContext';
import { GiHamburgerMenu } from "react-icons/gi";


export default function Navbar() {
  const [dropdown, setDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
   const[menuOpen , setMenuOpen] = useState(false);
   const[isNavExpand , setIsNavExpand] = useState(true);
   const location = useLocation();
  const isHomePage = location.pathname !== '/';
const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const serviceDropdown = [
    
    { id: 1, title: "About", path: "/about", cName: "s-item" },
    { id: 2, title: "Contact Us", path: "/contact", cName: "s-item" },
  ];

  const serviceDropdown2 = [
    { id: 1, title: "As Student", path: "/signup", cName: "s-item" },
    { id: 2, title: "As Tutor", path: "/signup", cName: "s-item" },
  ];

  useEffect(() => {
    
  }, []);
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) { 
        setIsNavExpand(false); 
      }
      if (window.innerWidth > 800) { 
        setIsNavExpand(true); 
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
<div className= {`nav navbar ${menuOpen?"menuopen": "box"}`}>
  <div className={isNavExpand?"flex justify-between items-center":"flex justify-between items-center  w-[100vw]"}>
<Link to="/" className="navlogo">LOGO</Link>
{!isNavExpand && <GiHamburgerMenu className='navlogo' onClick={()=>setMenuOpen(!menuOpen)}/>}
<br></br>
</div>
   {!isNavExpand && <div className='w-[80%] pt-4 ml-auto mr-auto text-white font-[1.5rem]'>
    {menuOpen && <ul>
      <hr className='bg-black text-black'></hr>
    <li className='pb-2 pt-2 sm:text-[10px] lg:text-[1.1rem]' onClick={()=>setMenuOpen(!menuOpen)}>
          <Link to="/">One-2-One-Class</Link>
        </li>
        <hr></hr>
        <li className='pb-2 pt-2 sm:text-[10px] lg:text-[1.1rem]' onClick={()=>setMenuOpen(!menuOpen)}>
          <Link to="/tutor">Top Tutors</Link>
        </li>
        <hr></hr>
        <li className='pb-2 pt-2 sm:text-[10px] lg:text-[1.1rem]' onClick={()=>setMenuOpen(!menuOpen)}>
          <Link to="/">Students</Link>
        </li>
        <hr></hr>
        <li className='pb-2 pt-2 sm:text-[10px] lg:text-[1.1rem]' onClick={()=>setMenuOpen(!menuOpen)}>
          <Link to="/">Online Class</Link>
        </li>
        <hr></hr>
        {(!isLoggedIn ? (
          <>
            <Link to="/login"><li className='pb-2 pt-2' onClick={()=>setMenuOpen(!menuOpen)}>Login</li></Link>
            <hr></hr>

            <Link to="/signup"><li className='pb-2 pt-2' onClick={()=>setMenuOpen(!menuOpen)}>I Need A Tutor</li></Link>
            <hr></hr>

            <Link to="/signup"><li className='pb-2 pt-2' onClick={()=>setMenuOpen(!menuOpen)}>Join As Tutor</li></Link>
            <hr></hr>

          </>
        ) : (
          <>
            <Link to="/" >
              <button
                className='pb-2 pt-2'
                onClick={() => {
                  setIsLoggedIn(false);
                  setMenuOpen(!menuOpen)
                  toast.success("Logged Out");
                }}
              >
                Logout
              </button>
              <br/>
              <hr></hr>
            </Link>
            <Link to="/Studentdashboard">
              <button onClick={()=>setMenuOpen(!menuOpen)} className='pb-2 pt-2'>Dashboard</button>
            </Link>
            <hr></hr>
          </>
        ))}
    </ul>}
   </div> }
   <ul className={menuOpen ? "" : ""}/>
      {isNavExpand && <ul className="navitem">
        <li >
          <Link to="/" >One-2-One-Class</Link>
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
      </ul>}


      <ul className={!isNavExpand?"":"auth"}>
      {isNavExpand &&  (!isLoggedIn ? (
          <>
            <Link to="/login"><li>Login</li></Link>
            <Link to="/signup">
              <li
                onMouseEnter={() => setDropdown("serviceDropdown2")}
                onMouseLeave={() => setDropdown(null)}
              >
                {dropdown === "serviceDropdown2" && <Dropdown serviceDropdown={serviceDropdown2} />}
                Sign Up <FaChevronDown />
              </li>
            </Link>
          </>
        ) : (
          <>
            <Link to="/">
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  toast.success("Logged Out");
                }}
              >
                Logout
              </button>
            </Link>
            <Link to="/Studentdashboard">
              <button>Dashboard</button>
            </Link>
          </>
        ))}
      </ul>
    </div>
  );
}
