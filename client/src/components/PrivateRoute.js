// PrivateRoute.js
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

// PrivateRoute component
const PrivateRoute = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // If the user is authenticated, render the child components, otherwise navigate to /signin
  return authUser ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
