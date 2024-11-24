import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import DeveloperFooter from './DeveloperFooter.jsx';

 function Footer() {
  // const navigate = useNavigate(); // hook to navigate

  //Function to handle the click and navigate
  const handleNavigation = (path) => {
    
    
  };

  return (
    <div>

    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>OUR SERVICES</h4>
          <ul>
            <li>
              <button onClick={() => handleNavigation("/one-to-one-classes")}>
                One-to-One Classes
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/online-tuition")}>
                Online Tuition Classes
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/cbse-courses")}>
                CBSE Online Courses
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/part-time-earning")}>
                Part Time Earning For Tutor
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ONLINE COURSES</h4>
          <ul>
            <li>
              <button onClick={() => handleNavigation("/cbse-class-9")}>
                Course for CBSE Class 9th
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/cbse-class-10")}>
                Course for CBSE Class 10th
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/study-material-9")}>
                Study Material for Class 9th
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/study-material-10")}>
                Study Material for Class 10th
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ONE-TO-ONE CLASSES</h4>
          <ul>
            <li>
              <button onClick={() => handleNavigation("/home-tuition")}>
                One-to-One Home Tuition
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/online-tuition")}>
                One-to-One Online Tuition
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/online-tuition")}>
                One-to-One Online Tuition
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/group-tuition")}>
                One-to-One Group Tuition
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>TUTOR ZONE</h4>
          <ul>
            <li>
              <button onClick={() => handleNavigation("/search-tutor")}>
                Search for Tutor
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/search-student")}>
                Search for Student
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/earn-part-time")}>
                Earn Part Time
              </button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/teach-nearby")}>
                Teach Nearby Student
              </button>
            </li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>CONTACT US</h4>
          <ul>
            <li>Beta I, Knowledge park, Greater_Noida, UP - 201326</li>
            <li>Service: +91 9811328336</li>
            <li>WhatsApp: +91 7065-80-4545</li>
            <li>Email: info@gharpetshiksha.com</li>
          </ul>
        </div>
      <hr></hr>
      </div>
      </footer>
      <DeveloperFooter/>
    </div>

            )
          };
            
export default Footer;