
import { SiSololearn } from "react-icons/si";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa6";
function Designcard(){
    const DesignItem=[
        {   id:1,
           icon:<FaUserTie/>,
           heading:"Exprinced Tutors"
        },
        {   id:2,
           icon:<VscVerifiedFilled/>,
           heading:"Proven Results"
        },
        {   id:3,
           icon:<SiSololearn/>,
           heading:"Prosnalized Learning"
        },
    ]
    return(
        <div className="lg:flex justify-center">
 {
   DesignItem.map((item,index)=>(
    <div key={item.id} className="flex flex-row lg:w-[33%] h-auto text-white">
    <div className=" gap-1 flex text-white flex-row bg-custom-blue w-full p-6 m-3 rounded">
<div className="icon resize text-[20px]">{item.icon}</div>
 <div className='heading text-white font-inter lg:mb-[38px]'>{item.heading} </div>
   </div>
   </div>

))
 }
        </div>
 
    )
}
export default Designcard;