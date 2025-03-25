import { useLogoutMutation } from '../features/auth/userApi';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, SquarePen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setLogout } from '../features/auth/authSlice';
import { toast } from 'react-hot-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user, isAuthenticated } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountMenu = () => setIsAccountMenuOpen(!isAccountMenuOpen);
  useEffect(() => {
    setIsAccountMenuOpen(false);
  }, [navigate]);

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");

    try {
      dispatch(setLogout()); 
      localStorage.removeItem('authToken'); 
      localStorage.removeItem('user');
      await logout().unwrap(); 
      toast.success('Logout Sucessful!',{id:toastId})
      navigate('/login'); 
    } catch (err) {
      toast.error(err.message || 'Error occured', {id:toastId})
      console.error('Logout failed:', err.message);
    }
    finally{
      setTimeout(() => toast.dismiss(toastId), 2000)

    }
   
  };

  return (
    <nav className="bg-gray-100 shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-800">MyTutorMatch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
         {token &&  <Link to={user.role === "Tutor" ? "/student" : "/tutor"} className="text-gray-700 hover:text-indigo-600 transition-colors">
           {user.role ==="Tutor" ? "Find Students" : 'Find Tutor' }
          </Link>}

          {!isAuthenticated && <Link to= "/tutor" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
             Find Tutor
              </Link>}
          {!isAuthenticated && <Link to= "/student" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
             Find Student
              </Link>}
              
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={toggleMenu}>
            About Us
          </Link>
         {token && <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-600 transition-colors" onClick={toggleMenu}>
            My Bookings
          </Link>}
          
          {/* Show Dashboard if logged in */}
          {token ? (
            <Link to={
              user.role === "Tutor" || user.role === "Student"
              ? "/userdashboard/profile"
              : user.role === "Admin"
              ? "/dashboard"
              : "/unauthorised"
            } className="text-gray-700 hover:text-indigo-600 transition-colors">
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors">
              Login
            </Link>
          )}

          {/*  Dropdown */}
          {(token && user) ? (
            <div className="relative">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors"
                onClick={toggleAccountMenu}
              >
                <User className="h-5 w-5" />
                <span>{user.userName}</span>
              </button>
              {isAccountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 transition-all duration-200">
                  <Link to={user.role === 'Admin' ? "/dashboard/profile":"/userdashboard/profile"} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ):(
            <Link to="/signup" className="text-white rounded-full flex items-center gap-2 bg-blue-500 px-3 py-1.5  transition-colors">
               <SquarePen  className='h-5 w-4'/>
              SignUp
            </Link>
          )}
        </div>

        {/* Mobile ke liye */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile  */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4"
          >
            <div className="flex flex-col space-y-4 px-4 py-2">
             {token && <Link to={user.role === "Tutor" ? "/student" : "/tutor"} className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
             {user.role ==="Tutor" ? "Find Students" : 'Find Tutor' }
              </Link>}

             {!isAuthenticated && <Link to= "/tutor" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
             Find Tutor
              </Link>}

             {!isAuthenticated && <Link to="/student" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
             Find Student
              </Link>}
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
                About Us
              </Link>
             {token && <Link to="/my-bookings" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
                My Bookings
              </Link>}
              {token && (
                <Link  to ={ user.role === "Tutor" || user.role === "Student"
                ? "/userdashboard"
                : user.role === "Admin"
                ? "/dashboard"
                : "/unauthorised"} className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
                  Dashboard
                </Link>
              )}
                {(token && user) ? <Link to ={user.role === 'Admin' ? "/dashboard/profile":"/userdashboard/profile"}  onClick={toggleMenu}  className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors py-2">
                  <User className="h-5 w-5 mr-2" />
                  {user.userName}
                </Link> : ( <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
                  Login
                </Link>)}
                 {token ? <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors py-2">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign Out
                  </button> : ( <Link to="/signup" className="text-gray-700 hover:text-indigo-600 transition-colors py-2" onClick={toggleMenu}>
                  SignUp
                </Link>)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
