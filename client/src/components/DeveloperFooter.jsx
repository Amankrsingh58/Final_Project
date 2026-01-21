import React from "react";
import "./DeveloperFooter.css";

const DeveloperFooter = () => {
  return (
    <footer className="developer-footer bg-gray-900">
      <div className="footer-main">
        <h1> Developer Connect</h1>
        <p>
          Connect With Us
        </p>
        <div className="social-links">
        <a href="https://www.linkedin.com/in/anjani-kumar-683ba725a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <img
             src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png"
                 alt="LinkedIn"
            />
          </a>
          <a href="#twitter" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/twitter.png"
              alt="Twitter"
            />
          </a>
          <a href="#google" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/google-logo.png"
              alt="Google"
            />
          </a>
          <a href="#youtube" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/youtube-play.png"
              alt="YouTube"
            />
          </a>
          <a href="https://www.linkedin.com/in/aman-kumar-singh-030083243?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
            <img
              src="https://img.icons8.com/ios-filled/30/ffffff/linkedin.png"
              alt="LinkedIn"
            />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright ©2024 <a href="#foolishdeveloper">Developed by Aman and Anjani</a>
        </p>
        <div className="footer-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="#blog">Blog</a>
        </div>
      </div>
    </footer>
  );
};

export default DeveloperFooter;