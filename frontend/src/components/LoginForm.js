import React from "react";
import "./LoginForm.css";
import LOGIN from "../Images/login12.jpg"

const LoginForm = () => {
  return (
    <div className="login-page">
      {/* Left section */}
      <div className="login-page-left">
       
        <div className="welcome-message">
        <img src={LOGIN}/>
         
        
        </div>
        
      </div>

      {/* Right section */}
      <div className="login-page-right">
        <div className="login-container">
          <h2>Welcome Back!</h2>
          <p>
            Don't have an account? <a href="/signup">Create a new account now</a>, it's FREE!
          </p>
          <form>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login Now
            </button>
          </form>
          
          <a href="/forgot-password" className="forgot-password">
            Forgot password? Click here
          </a>
        </div>
      </div>
    </div>
  );
};




export default LoginForm;


