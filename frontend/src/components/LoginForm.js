import React, { useContext, useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./LoginForm.css";
import { AuthContext } from "../hooks/AuthContext";
import LOGIN from "../Images/login12.jpg";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:6001/api/users/login", data, {withCredentials: true }); // Replace "url" with your API endpoint
      console.log(response.data); // Handle the response
      
      toast.success("Login successful!");
      setIsLoggedIn(true);
      
      // Optionally store a token in local storage (if you use tokens)
      // localStorage.setItem("token", response.data.token);
      
    } catch (error) {
      // console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  const [isExpand,setIsExpand] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) { 
        setIsExpand(false); 
      }
      if (window.innerWidth > 800) { 
        setIsExpand(true); 
      }
    };
  
    window.addEventListener('resize', handleResize);
  
    handleResize();
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  return (
    <div className="login-page  lg:flex-row xs:h-[100vh] md:h-[100vh] md:justify-center">
      {/* Left section */}
     {isExpand && <div className="login-page-left xs:w-[100vw] md:w-[50vw] md-w-[50%]">
        <div className="welcome-message">
          <img src={LOGIN} alt="Login visual" />
        </div>
      </div>}

      {/* Right section */}
      <div className="login-page-right xs:w-[100vw] md:w-[50%]">
        <div className="login-container">
          <h2>Welcome Back!</h2>
          <p>
            Don't have an account? <a href="/signup">Create a new account now</a>, it's FREE!
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
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
