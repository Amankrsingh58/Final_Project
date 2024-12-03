import React from 'react'
import Topbar from './Topbar'
import { Navigate, useNavigate } from 'react-router-dom'

function DashboardHome() {
    const Navigate = useNavigate();
    
    function clickHandler () {
        Navigate("/dashboard/profile");
    }
  return (
    <div>
        <Topbar/>
        <button onClick={clickHandler}>Go to profile</button>
    </div>
  )
}

export default DashboardHome