import './Loginsign.css'
 const Loginsign= () =>{
    return (
        
<div className='container'>
<div className='header'>
<div className='text'> Sign Up</div>
<div className='underline'></div>

</div>
<div className='inputs'>
<div className='input'>
    <h2>enter your mail</h2>
    <input type='text'/>
</div>
<div className='input'>
   <h2>enter your email</h2>
    <input type='Email'/>
</div>
<div className='input'>
  <h2>Enter your password</h2>
    <input type='password'/>
</div>

</div>
<div className='forgot-password'>Lost password ? <span>click here</span></div>
<div className='submit-container'>
<div className='submit'> Sign UP</div>
<div className='submit'> Login</div>

</div>



</div>
    )
 }
 export default Loginsign;