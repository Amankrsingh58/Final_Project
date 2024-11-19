import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginForm.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const url = "https://example.com/api/login"; // Replace with your actual API endpoint
    try {
      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status===200) {
        console.log("Login successful:", response);
        toast.success("Login Successful!");
        
      } else {
        toast.error("Login Faild");
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className=" flex justify-center">

      <div className="login-card">
        <h2>Login</h2>
        {errors.email && <div className="error-message">Email is required</div>}
        {errors.password && <div className="error-message">Password is required</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email/Username</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: true,
                pattern: {
                  value:
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                }, })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="input-with-icon"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              {...register("password", { required: true },
              )}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="#">Sign Up</a>
          </p>
          <p>
            Forgot password? <a href="#">Reset</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;


