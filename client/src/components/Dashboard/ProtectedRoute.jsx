import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; 

const ProtectedRoute = ({ allowedRoles }) => {
  const {user} = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" replace />; 
  }

  console.log("allow role and user role",allowedRoles,user.role)
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; 
  }

  return <Outlet />;
};

export default ProtectedRoute;
