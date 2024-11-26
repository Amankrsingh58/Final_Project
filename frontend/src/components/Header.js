import React from 'react'
import Mainimage from '../Images/hero1.png';
import App from './Card';
import "./Header.css"
function Header(){
  return(
    <div className='header'>
    <img className='main-img' src ={Mainimage}alt='logo'></img>
    </div>
  )
}
export default Header;