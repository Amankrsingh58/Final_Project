import Tutor from "../../pages/Tutor";
import Card from "../Card";
import React from "react";
import { Navigate,useNavigate } from "react-router-dom";

function Studenttutor(){
    const Navigate = useNavigate();
    const tutors = [
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "853302",
          experience: "25 year",
          std:"v",
          subject:"maths",
          imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        {
          id: "20019",
          experience: "10 year",
          std:"v",
          subject:"maths",
          imageUrl:
            "https://imgs.search.brave.com/bQDraoG_AAPe1jsb6cljXafkoD8bat2uVnM7o2_OMsU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IxLndlYnA",
        },
        {
          id: "2022",
          experience: "2 year",
          std:"v",
          subject:"maths",
           imageUrl: "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
        
        {
          id: "20019",
          experience: "10 year",
          std:"v",
          subject:"maths",
          imageUrl:
            "https://imgs.search.brave.com/nkNR7hH6AJM__x9b1B7N5kxdDYBSQjsBuWbweQuKwso/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLnd5emFudGNk/bi5jb20vaW1hZ2Vz/L3Nlby1zdG9jay10/dXRvcnMvYmlndHV0/b3IyLndlYnA",
        },
      ];
    return(
        <div className="bg-blue-600 w-full h-auto">
        <div className="flex flex-row gap-7 justify-center ">
        <h1 className="text-4xl ">Following tutors are near you</h1>
        </div>
        <div className="flex flex-row gap-7 justify-center flex-wrap m-5 shadow-medium">
     
            {
                tutors.map((tutor,index)=>(
                    <div className=" bg-[#221F3C] justify-center rounded m-3 shadow-md w-[21%]" key={index}>
                        <img src={tutor.imageUrl}alt ="tutor" className="object-cover h-48 w-96 rounded "/>
                        <div className="tutorInfo">
                      <p className="mt-[6px] ml-1 font-inter"> Tutor ID:{tutor.id}</p>
                      <p className="mt-[5px] ml-1  font-inter">Exprince :{tutor.experience}</p>
                      <p className="mt-[5px] ml-1  font-inter">Exprince : {tutor.std}</p>
                      <p className="mt-[5px] ml-1  font-inter">Subjects : {tutor.subject}</p>
                        </div>
                        <button onClick={ ()=> Navigate("/tutor")} className="bg-yellow-400 rounded p-2 mt-2 w-full">Get contect info</button>
                        </div>
                    

                ))
            }
        
          
        </div>
        </div>
       
    )
}
export default Studenttutor;