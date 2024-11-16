import React, { useState } from 'react'
import './Navbar.css'
import Logo from '../Images/logo4.jpeg';
import { SiStudyverse } from "react-icons/si";
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
// import { toast } from "react-toastify";
import { FaChevronDown } from 'react-icons/fa';




export default function Navbar(props) {
  const [dropdown, setDropdown] = useState(false);
  let isLoggedIn =props.isLoggedIn;
  let setisaLoggesIn=props.setisaLoggesIn;

 let  serviceDropdown = [
    {
    id:1,
    title:"About",
    path:"./about",
    cName:"s-item"
  },
  {
    id:2,
    title:"Contact Us",
    path:"/contact",
    cName:"s-item"
  }
  ]

  function clickHandler() {
    setisaLoggesIn(true);
    // toast.success("Signed In");
  }

  function clickHandler2() {
    setisaLoggesIn(true);
  }

  return (
    <div className='box'>
        
        <Link to="/" className='logo'>
              {/* <img src={Logo} width={70} height={70}/> */}
            LOGO
        </Link>

        {/* <nav className='nav'> */}
          <ul className='navitem'>
            <li className='flex gap-3'>
              <Link to="/">One-2-One-Class</Link>
            </li>

            <li>
              <Link to="/">Top Tutors</Link>
            </li>
              
            <li>
              <Link to="/">Students</Link>

            </li>

            <li>
              <Link to="/">Online Class</Link>

            </li>

            <li 
            onMouseEnter={ () => setDropdown(true)}
              onMouseLeave={ ()=> setDropdown(false)}
              >
                {dropdown && <Dropdown serviceDropdown={serviceDropdown}/>}
               <Link className='cursor' to="">More <FaChevronDown /> </Link> 
            </li>

            <ul className='auth'>
            { !isLoggedIn &&
           <Link to="/">
                <button onClick={clickHandler}>Login</button>
          </Link>}

          { !isLoggedIn &&
           <Link to='/'>
                <button onClick={clickHandler2}>Sign Up</button>
          </Link>}

        {  isLoggedIn &&
           <Link to='/'>
                <button onClick={ () => { setisaLoggesIn(false)
                                    // toast.success("Logged Out");
                                  }
                                    }>Logout</button>
          </Link>}

          { isLoggedIn &&
           <Link to='/'>
                <button>Dashboard</button>
          </Link>}
          </ul>
          </ul>
        {/* </nav> */}

    </div>
  )
}
