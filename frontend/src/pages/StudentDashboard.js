import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Studentdashboardhome from '../components/StudentDashboard/Studentdashboardhome'

function StudentDashboard() {
  return (
    <div>
        <Routes>
            <Route to="studentdashboardhome" element={<Studentdashboardhome/>} />
        </Routes>
    </div>
  )
}

export default StudentDashboard