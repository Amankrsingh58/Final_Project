import React from "react";
import pic from '../Images/pic.png';
import './Container.css'
function Container(){
    return(
<div className="container">
 <img src={pic}alt="picture"/>
 <hr></hr>
 <br></br>
 <div>


 <b className="text">Not sure? Take a free online counselling class from GharPeShiksha </b>
 <br></br>
 <b className="text2" >and clear your confusions.</b>
 <br></br>
 <br></br>
 
 <hr></hr>
 <button className="button">BOOK YOUR FREE DEMO</button>
 </div>
</div>
    );
}
export default Container;