import React, { useState } from 'react'
import {AiOutlineEye, AiOutlineEyeInvisible}from "react-icons/ai";

function SignupForm (){

  const [formData,setFormData]= useState({
    FirstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:""

  })
  function changeHandler(event){
    setFormData((prevData)=>(
      {
     ...prevData,
     [event.target.name]:event.target.value
    }
  ))

   }
    
const [showPassword,setShowPassword] = useState(false);


  return (
   <div>
<div>
  <button>student</button>
  <button>Tutor</button>
  <label>
    <p>First Name <sup>*</sup></p>
    <input
    required
    type='text'
    name='First name'
    onChange={changeHandler}
    placeholder='Enter First Name'
    value={formData.FirstName}
    
    />
  </label>
  <label>
    <p>Last Name <sup>*</sup></p>
    <input
    required
    type='text'
    name='Last name'
    onChange={changeHandler}
    placeholder='Enter Last Name'
    value={formData.lastName}
    
    />
  </label>
</div>
<form>
<label>
    <p>Email Address<sup>*</sup></p>
    <input
    required
    type='text'
    name='Email Address'
    onChange={changeHandler}
    placeholder='Enter Email Address'
    value={formData.email}
    
    />
    </label>
    <div>
    <label>
    <p>password<sup>*</sup></p>
    <input
    required
    type={showPassword ? ("text"):("password")}
    name='password'
    onChange={changeHandler}
    placeholder='Enter password'
    value={formData.password}
    
    />
     <span onClick={()=>setShowPassword((prev)=>!prev)}>
        {showPassword ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>) }
        </span>
    </label>
    <label>
    <p> Confirm password<sup>*</sup></p>
    <input
    required
    type={showPassword ? ("text"):("password")}
    name='Confirm'
    onChange={changeHandler}
    placeholder='Confirm password'
    value={formData.confirmPassword}
    
    />
    <span onClick={()=>setShowPassword((prev)=>!prev)}>
        {showPassword ? (<AiOutlineEyeInvisible/>):(<AiOutlineEye/>) }
        </span>
   
    </label>
    <button>Create Account</button>
    </div>
 
</form>
   </div>
  )
}

export default SignupForm