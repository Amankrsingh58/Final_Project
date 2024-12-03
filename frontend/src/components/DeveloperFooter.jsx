import React from "react";

const DeveloperFooter = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-8 font-sans">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Developer Connect</h1>
        <p className="text-sm mb-5 leading-relaxed">Connect With Us</p>
        <div className="flex justify-center gap-4">
          <a href="#facebook" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/facebook.png"
              alt="Facebook"
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a href="#twitter" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/twitter.png"
              alt="Twitter"
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a href="#google" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/google-logo.png"
              alt="Google"
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a href="#youtube" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/youtube-play.png"
              alt="YouTube"
              className="hover:scale-110 transition-transform"
            />
          </a>
          <a href="#linkedin" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png"
              alt="LinkedIn"
              className="hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
      <div className="border-t border-white/20 pt-4 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="mb-2 md:mb-0">
          Copyright ©2024{" "}
          <a
            href="#foolishdeveloper"
            className="text-green-300 hover:text-green-400 transition-colors"
          >
            Developed by Aman and Anjani
          </a>
        </p>
        <div className="flex gap-4">
          <a
            href="#home"
            className="hover:underline hover:text-green-300 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:underline hover:text-green-300 transition-colors"
          >
            About
          </a>
          <a
            href="#contact"
            className="hover:underline hover:text-green-300 transition-colors"
          >
            Contact
          </a>
          <a
            href="#blog"
            className="hover:underline hover:text-green-300 transition-colors"
          >
            Blog
          </a>
        </div>
      </div>
    </footer>
  );
};

export default DeveloperFooter;

