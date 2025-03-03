import React from 'react';
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeveloperFooter from '../components/DeveloperFooter'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="text-xl font-bold">TutorMatch</span>
            </div>
            <p className="text-gray-300 mb-4">
              Connecting students with expert tutors for personalized learning experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tutors" className="text-gray-300 hover:text-white transition-colors">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/become-tutor" className="text-gray-300 hover:text-white transition-colors">
                  Become a Tutor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Subjects</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tutors?subject=mathematics" className="text-gray-300 hover:text-white transition-colors">
                  Mathematics
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=science" className="text-gray-300 hover:text-white transition-colors">
                  Science
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=english" className="text-gray-300 hover:text-white transition-colors">
                  English
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=programming" className="text-gray-300 hover:text-white transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link to="/tutors?subject=languages" className="text-gray-300 hover:text-white transition-colors">
                  Languages
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-indigo-400 mr-2 mt-0.5" />
                <span className="text-gray-300">Beta -I Gr-Noida, UP, 201306</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-300">(+91) 8287393644</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-indigo-400 mr-2" />
                <span className="text-gray-300">contact@tutormatch.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* <DeveloperFooter/> */}

        {/* <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} TutorMatch. All rights reserved.</p>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;