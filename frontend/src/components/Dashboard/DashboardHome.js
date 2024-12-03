import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardHome() {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate('/dashboard/profile');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[60%_38%] grid-rows-auto sm:grid-rows-2 mt-4 gap-2.5 rounded-md h-auto sm:h-[80%]">
      <div className="bg-blue-500 h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 1, Column 1
      </div>
      <div className="bg-green-500 h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 1, Column 2
      </div>
      <div className="bg-red-500 h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 2, Column 1
      </div>
      <div className="bg-yellow-500 h-40 sm:h-full rounded-md flex items-center justify-center">
        Row 2, Column 2
      </div>
    </div>
  );
}

export default DashboardHome;
