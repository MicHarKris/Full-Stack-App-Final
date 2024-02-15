import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
  // Context
  const { authUser } = useContext(UserContext);
  const location = useLocation();

  // As an If statement
  if (authUser) {
    return <Outlet />;
  } else {
    // Pass location state to SignIn component, so that it can 
    // redirect to the page the user was trying to access
    return <Navigate to="/signin" state={{from: location.pathname}} />;
  }

  // As a ternary operator
  // return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
