 import React from "react";
 import { X } from 'lucide-react';
function TutorDetails(){
    return(
<div className='fixed  inset-0  bg-black  bg-opacity-30 backdrop-blur-5m flex justify-center item-center '>
<div>
    <button className="place-self-end"><X size={30}/></button>
    <div className=' bg-indigo-600 round-xl px-20 py-10 flex flex-col gap-5 items-center mx-4'>
        <h1 >Tutors Details</h1>
        <p className='text-3xl font-bold max-w-md text-center'>the tutors Details will shown below</p>
    </div>


</div>
</div>
 )
}
export default TutorDetails;
