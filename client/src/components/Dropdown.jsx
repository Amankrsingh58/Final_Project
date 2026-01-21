import React, { useState } from 'react'
import './Dropdown.css'
import { Link } from 'react-router-dom'

function Dropdown(props) {
    const [dropdown, setDropdown] = useState(false);

  let serviceDropdown = props.serviceDropdown;
  return (
    <div>
      <ul className={dropdown? "servicessubmenu clicked":'servicessubmenu'} onClick={()=>setDropdown(!dropdown)}>
        {serviceDropdown.map((item) => {
            return(
                <li key={item.id}>
                    <Link to={item.path} className={item.cName}
                    onClick={()=>setDropdown(false)}>{item.title}</Link>
                </li>
            );
            })}
      </ul>  
    </div>
  )
}

export default Dropdown