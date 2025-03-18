import React from 'react'
import Mainimage from '../Images/hero1.png';
import App from './Card';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import "./Header.css"
import { useSelector } from 'react-redux';
import { authApi } from '../features/auth/userApi';
import {useState, useEffect} from 'react'
function Header(){

  const {token,user,isAuthenticated} = useSelector( (state) => state.auth);

  const [isTablet, setIsTablet] = useState(true);

  const handleResize = () => {
    // Update state based on window width (768px is typical tablet size)
    if (window.innerWidth < 768) {
      setIsTablet(false);
    } else {
      setIsTablet(true);
    }
  };

  useEffect(() => {
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    
    // Initial check when the component is mounted
    handleResize();

    // Clean up the event listener on component unmount
    // return () => window.removeEventListener('resize', handleResize);
  }, []);

  
    const fadeIn = {
      hidden: { opacity: 0, y: 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6 }
      }
    };
  
    const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2
        }
      }
    };
  
  return(
    <section className="xs:mt-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white py-20 md:py-32">
    <div className="max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div 
          className="md:w-1/2 mb-10 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Tutor Today</h1>
          <p className="text-xl mb-8">Connect with expert tutors for personalized learning experiences that help you achieve your academic goals.</p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to={user && user.role === 'Tutor' ? "/student" : "/tutor"}
              className="bg-white text-indigo-600 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors text-center"
            >{user && user.role === 'Tutor' ? "Look For Students" : "Find a Tutor"}
              
            </Link>
            <Link 
              to="/signup" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-indigo-600 transition-colors text-center"
            >{isAuthenticated ? "Enquire Now" : "Become a Tutor"}
            </Link>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
         {isTablet && <img 
            src={Mainimage}
            alt="Online tutoring" 
            className="xs:hidden md:block"
          />}
        </motion.div>
      </div>
    </div>
  </section>
  )
}
export default Header;