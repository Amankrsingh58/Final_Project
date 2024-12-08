import Tutor from "../../pages/Tutor";
import Card from "../Card";
import React from "react";
function Studenttutor(){
    return(
        <div className="flex flex-col justify-center">
           <h1 className="bg-blue-400">This is tutor Dashboard</h1>
            {/* <Tutor/> */}
            <Card/>
        </div>
    )
}
export default Studenttutor;