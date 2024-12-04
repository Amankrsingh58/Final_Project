import React from "react";
import { useForm } from "react-hook-form";
import bgimg from '../Images/5156366.jpg'
import "./SignupForm.css";

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchPassword = watch("password");

  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data);
      // Simulate API call
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Server Response:", result);
      alert("Signup Successful");
    } catch (error) {
      console.error("Error in Signup:", error);
    }
  };

  return (


    <div className="signup-page">
    {/* Left section */}
    <div className="signup-page-left">
      <div className="welcome-message">
        <img src={bgimg} alt="Login visual" />
      </div>
    </div>

    {/* Right section */}
    <div className="signup-page-right">
      <div className="signup-container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error">{errors.username.message}</span>}
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error">{errors.password.message}</span>}
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watchPassword || "Passwords do not match",
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button className="signup-btn" type="submit">Sign Up</button>
        </form>
        </div>
      </div>
  </div>

  );
};

export default SignupForm;
