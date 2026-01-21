import React from "react";
import Login from '../Images/Login.jpg'
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import './Tamplate.css'

const Template=({ title,desc1,desc2,image,formtype ,setIsLoggedIn})=>{
    return(
        <div className='felx' > 
<>
<h1>{title}</h1>
<p>
    <span>
        {desc1}
    </span>
    <span>{desc2}</span>
</p>
{formtype ==="signup"? 

(<SignupForm/>):
(<LoginForm/>)}
<div>
    <div></div>
    <p>OR</p>
    <div></div>
</div>
<button>Sign up with google</button>

</>
<img  className='image'src={Login} alt="login img"/>
        </div>
    )
}
export default Template;