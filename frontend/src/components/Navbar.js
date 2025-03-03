import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-100 shadow-md py-4 px-6 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-indigo-600" />
          <span className="text-xl font-bold text-gray-800">TutorMatch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/tutor" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Find Tutors
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 transition-colors">
            About Us
          </Link>
          {/* Dummy links for UI */}
          <Link to="/bookings" className="text-gray-700 hover:text-indigo-600 transition-colors">
            My Bookings
          </Link>
          <Link to="/tutor-dashboard" className="text-gray-700 hover:text-indigo-600 transition-colors">
            Tutor Dashboard
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600 transition-colors">
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile Settings
              </Link>
              <button
                // Removed actual sign-out logic for simplicity
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
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
              <Link
                to="/tutor"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Find Tutors
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              {/* Dummy links for UI */}
              <Link
                to="/bookings"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                My Bookings
              </Link>
              <Link
                to="/tutor-dashboard"
                className="text-gray-600 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Tutor Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-indigo-600 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                // Removed actual sign-out logic for simplicity
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors py-2"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
