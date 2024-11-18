// import React, { useState } from 'react'
// import {AiOutlineEye, AiOutlineEyeInvisible}from "react-icons/ai";

// function SignupForm (){

//   const [formData,setFormData]= useState({
//     FirstName:"",
//     lastName:"",
//     email:"",
//     password:"",
//     confirmPassword:""

//   })
//   function changeHandler(event){
//     setFormData((prevData)=>(
//       {
//      ...prevData,
//      [event.target.name]:event.target.value
//     }
//   ))

//    }
    
// const [showPassword,setShowPassword] = useState(false);


//   return (
//    <div>
// <div>
//   <button>student</button>
//   <button>Tutor</button>
//   <label>
//     <p>First Name <sup>*</sup></p>
//     <input
//     required
//     type='text'
//     name='First name'
//     onChange={changeHandler}
//     placeholder='Enter First Name'
//     value={formData.FirstName}
    
//     />
//   </label>
//   <label>
//     <p>Last Name <sup>*</sup></p>
//     <input
//     required
//     type='text'
//     name='Last name'
//     onChange={changeHandler}
//     placeholder='Enter Last Name'
//     value={formData.lastName}
    
//     />
//   </label>
// </div>
// <form>
// <label>
//     <p>Email Address<sup>*</sup></p>
//     <input
//     required
//     type='text'
//     name='Email Address'
//     onChange={changeHandler}
//     placeholder='Enter Email Address'
//     value={formData.email}
    
//     />
//     </label>
//     <div>
//     <label>
//     <p>password<sup>*</sup></p>
//     <input
//     required
//     type={showPassword ? ("text"):("password")}
//     name='password'
//     onChange={changeHandler}
//     placeholder='Enter password'
//     value={formData.password}
    
//     />
//      <span onClick={()=>setShowPassword((prev)=>!prev)}>
//         {showPassword ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>) }
//         </span>
//     </label>
//     <label>
//     <p> Confirm password<sup>*</sup></p>
//     <input
//     required
//     type={showPassword ? ("text"):("password")}
//     name='Confirm'
//     onChange={changeHandler}
//     placeholder='Confirm password'
//     value={formData.confirmPassword}
    
//     />
//     <span onClick={()=>setShowPassword((prev)=>!prev)}>
//         {showPassword ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>) }
//         </span>
   
//     </label>
//     <button>Create Account</button>
//     </div>
 
// </form>
//    </div>
//   )
// }

// export default SignupForm
import React, { useState } from "react";
import "./SignupForm.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username) tempErrors.username = "Username is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid.";
    if (!formData.password) tempErrors.password = "Password is required.";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }
    return tempErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      setSubmitted(true);
      console.log("Form submitted successfully:", formData);
    }
  };

  return (
    <div className="signup-form-container">
      <h1>Signup</h1>
      {submitted && <p className="success-message">Signup successful!</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
