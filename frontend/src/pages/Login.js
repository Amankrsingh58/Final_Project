import React from 'react'
import Template from '../components/Tamplate'
import LoginForm from '../components/LoginForm'
import login from '../Images/Login.jpg'

function Login() {
  return (
    
    <Template
    title="Welcome Back"
    desc1="Build skills for today ,tomorrow, and beyond."
    desc2="Education to future-proof your career"
    image={login}
    formtyoe = "login"
    // setIsLoggedIn={setIsLoggedIn}
    
    />
   


  )
}

export default Login;