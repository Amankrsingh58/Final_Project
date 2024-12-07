
import { SiSololearn } from "react-icons/si";
import { VscVerifiedFilled } from "react-icons/vsc";
import { FaUserTie } from "react-icons/fa6";
function Designcard(){
    const DesignItem=[
        {
           icon:<FaUserTie/>,
           heading:"Exprinced Tutors"
        },
        {
           icon:<VscVerifiedFilled/>,
           heading:"Proven Results"
        },
        {
           icon:<SiSololearn/>,
           heading:"Prosnalized Learning"
        },
    ]
    return(
        <div>
 {
   DesignItem.map((item,index)=>(
    <div className="flex flex-row">
    <div className=" flex flex-row bg-purple-300 w-full p-6 m-3 rounded">
<div className="icon resize">{item.icon}</div>
 <div className='heading text-white'>{item.heading} </div>
   </div>
   </div>

))
 }
        </div>
 
    )
}
export default Designcard;