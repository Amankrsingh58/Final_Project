// import React, { useState } from 'react'
// import {AiOutlineEye, AiOutlineEyeInvisible}from "react-icons/ai"
// import './LoginForm.css'

// function LoginForm() {
//   //  const [formData , setFormData]= useState({
//   //   email:"", password:""
//   //  })

//   //  const [showPassword , setShowPassword] = useState(false)
   
//   //  function changeHandler(event){
//   //   setFormData((prevData)=>(
//   //     {
//   //    ...prevData,
//   //    [event.target.name]:event.target.value
//   //   }
//   // ))

//   //  }
//   return (
    
//       {/* <form >
//     <label>
//       <p>Email Address<sup>*</sup>
//       </p>
//       <input 
//       required
//       type='email'
//       value={formData.email}
//       onChange={changeHandler}
//       placeholder='Enter email id'
//       name='email'
//       />
//     </label>
//     <label>
//       <p>Password<sup>*</sup>
//       </p>
//       <input 
//       required
//       type={showPassword ? ("text") : ("password")}
//       value={formData.password}
//       onChange={changeHandler}
//       placeholder='Enter Password'
//       name='password'
//       />
//       <span onClick={()=>setShowPassword((prev)=>!prev)}>
//         {showPassword ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>) }
   
//       </span>
     
//     </label>
//     <button className='button'>Signin</button>

//    </form> */}
   
//   <div className=''>
   
//   )
// }

// export default LoginForm
import React, { useState } from "react";
import "./LoginForm.css";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    // Example: Redirect or authenticate
    console.log("Logging in with", email, password);
    setError("");
    alert("Login Successful!");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email/Username</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email/username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="login-button">Login</button>
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
