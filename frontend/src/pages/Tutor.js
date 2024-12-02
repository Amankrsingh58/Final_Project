import { useEffect,useState } from "react";
import React from "react";
function Tutor(){
    const [records,setRecord]= useState([""]);
    useEffect(()=>{
      fetch("url")
      .then(Response=>Response.json())
      .then(data=>setRecord(data))
      .catch(err=> console.log(err))
    },[])
    return(
        <>
        <ul>
    {records.map((list,index)=>(
        <li 
        key={index}>{list.id} | {list.name}</li>
    ))}
</ul>
<div className='fixed  inset-0  bg-black  bg-opacity-30 backdrop-blur-5m flex justify-center item-center mt-[10vh]'>
<div>
    <button className="place-self-end"></button>
    <div className=' bg-indigo-600 round-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
        <h1 >Tutors Details</h1>
        <p className='text-3xl text-red-500 font-bold max-w-md text-center'>the tutors Details will shown below</p>
        tutor 1 <br></br>
        turor 2
    </div>


</div>
</div>
        </>

    )

}
export default Tutor;