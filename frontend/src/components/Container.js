import React from "react";
import pic from '../Images/pic.png';
import './Container.css'
function Container(){
    return(
<div className="container w-full">
 <img src={pic}alt="picture"/>
 
 <div className="demo">

 <p className="text">Not sure? Take a free online counselling class from GharPeShiksha <br/>
  and clear your confusions.</p>
 <button className="button">BOOK YOUR FREE DEMO</button>
 </div>
</div>
    );
}
export default Container;