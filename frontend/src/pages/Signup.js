import React from 'react'
import SignupForm from '../components/SignupForm'
import Template from '../components/Tamplate'

import login from '../Images/Login.jpg'

function Signup() {
  return (
    <div>
{/* <SignupForm/> */}
<Template
    title="Welcome Back"
    desc1="Build skills for today ,tomorrow, and beyond."
    desc2="Education to future-proof your career"
    image={login}
    formtype = "signup"
    // setIsLoggedIn={setIsLoggedIn}
    
    />

    </div>
   
  )
}

export default Signup