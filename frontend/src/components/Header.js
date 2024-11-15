import React from 'react'
import Mainimage from '../Images/Mainimage.jpg';
import App from './Card';
import "./Header.css"
function Header(){
  return(
    <>
    <img className='main-img' src ={Mainimage}alt='logo'></img>
    <App/>
    </>
  )
}
export default Header;