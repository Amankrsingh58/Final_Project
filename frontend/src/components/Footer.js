import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeveloperFooter from './DeveloperFooter.jsx';

function Footer() {
  const handleNavigation = (path) => {
    // Handle navigation
  };

  return (
    <div>
      <footer className="bg-blue-800 text-white py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Our Services Section */}
          <div className="footer-section">
            <h4 className="text-xl font-semibold mb-4">OUR SERVICES</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation("/one-to-one-classes")} className="text-lg hover:text-gray-400">
                  One-to-One Classes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/online-tuition")} className="text-lg hover:text-gray-400">
                  Online Tuition Classes
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/cbse-courses")} className="text-lg hover:text-gray-400">
                  CBSE Online Courses
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/part-time-earning")} className="text-lg hover:text-gray-400">
                  Part Time Earning For Tutor
                </button>
              </li>
            </ul>
          </div>

          {/* Online Courses Section */}
          <div className="footer-section">
            <h4 className="text-xl font-semibold mb-4">ONLINE COURSES</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation("/cbse-class-9")} className="text-lg hover:text-gray-400">
                  Course for CBSE Class 9th
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/cbse-class-10")} className="text-lg hover:text-gray-400">
                  Course for CBSE Class 10th
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/study-material-9")} className="text-lg hover:text-gray-400">
                  Study Material for Class 9th
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/study-material-10")} className="text-lg hover:text-gray-400">
                  Study Material for Class 10th
                </button>
              </li>
            </ul>
          </div>

          {/* One-to-One Classes Section */}
          <div className="footer-section">
            <h4 className="text-xl font-semibold mb-4">ONE-TO-ONE CLASSES</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation("/home-tuition")} className="text-lg hover:text-gray-400">
                  One-to-One Home Tuition
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/online-tuition")} className="text-lg hover:text-gray-400">
                  One-to-One Online Tuition
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/online-tuition")} className="text-lg hover:text-gray-400">
                  One-to-One Online Tuition
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/group-tuition")} className="text-lg hover:text-gray-400">
                  One-to-One Group Tuition
                </button>
              </li>
            </ul>
          </div>

          {/* Tutor Zone Section */}
          <div className="footer-section">
            <h4 className="text-xl font-semibold mb-4">TUTOR ZONE</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigation("/search-tutor")} className="text-lg hover:text-gray-400">
                  Search for Tutor
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/search-student")} className="text-lg hover:text-gray-400">
                  Search for Student
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/earn-part-time")} className="text-lg hover:text-gray-400">
                  Earn Part Time
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation("/teach-nearby")} className="text-lg hover:text-gray-400">
                  Teach Nearby Student
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact">
            <h4 className="text-xl font-semibold mb-4">CONTACT US</h4>
            <ul className="space-y-2">
              <li>Beta I, Knowledge park, Greater_Noida, UP - 201326</li>
              <li>Service: +91 9811328336</li>
              <li>WhatsApp: +91 7065-80-4545</li>
              <li>Email: info@gharpetshiksha.com</li>
            </ul>
          </div>
        </div>
        <hr className="my-4 border-gray-600" />
      </footer>
      <DeveloperFooter />
    </div>
  );
}

export default Footer;
