import { useEffect, useState } from "react";

function  TutorForm(){
  const [records,setRecord]= useState([""]);
  useEffect(()=>{
    fetch("url")
    .then(Response=>Response.json())
    .then(data=>setRecord(data))
    .catch(err=> console.log(err))
  },[])
  return(
    <div>
<ul>
    {records.map((list,index)=>(
        <li 
        key={index}>{list.id} | {list.name}</li>
    ))}
</ul>


    </div>
  )
  

}
export default TutorForm;