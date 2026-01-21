import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardHome() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/dashboard/profile');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[60%_38%] grid-rows-auto sm:grid-rows-2 mt-4 gap-2.5 rounded-md h-auto sm:h-[80%]">
      <div className="bg-[#21222D] h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 1, Column 1
      </div>

      <div className="grid grid-cols-[48.6%_48.6%]  gap-2.5 grid-rows-1 sm:h-full">
        <div className='h-full bg-[#21222D] rounded-md'>

        <div className='w-[70%] h-[50%] mt-[1rem] md:flex  ml-[1rem] flex flex-col gap-1'>
          <p className='font-inter text-white font-semibold text-[18px]'>Earnings</p>
          <p className='font-inter font-medium  text-[14px] text-[#87888C]'>Total Assests</p>
          <p className='font-inter leading-widest font-bold text-[24px] text-[#A9DFD8]'>$0.00</p>
          </div>

        </div>
        <div className='h-full bg-[#21222D] rounded-md'>
        <div className='w-[70%] h-[50%] mt-[1rem] md:flex  ml-[1rem] flex flex-col gap-1'>
          <p className='font-inter text-white font-semibold text-[18px]'>Total Users</p>
          {/* <p className='font-inter font-medium  text-[14px] text-[#87888C]'>Total Assests</p> */}
          {/* <p className='font-inter leading-widest font-bold text-[24px] text-[#A9DFD8]'>$6078.68</p> */}
          </div>
        </div>
      </div>

      <div className="bg-[#21222D] h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 2, Column 1
      </div>
      <div className="bg-[#21222D] h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 2, Column 2
      </div>
    </div>
  );
}

export default DashboardHome;
