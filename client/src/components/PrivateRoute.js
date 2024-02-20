// PrivateRoute.js
import { useContext } from "react";
import { Outlet } from "react-router-dom";

// Components
import Forbidden from "./Forbidden";

// Context
import UserContext from "../context/UserContext";

// PrivateRoute component
const PrivateRoute = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // If the user is authenticated, render the child components, otherwise render the Forbidden component
  if (authUser) {
    return <Outlet />;
  } else {
    return <Forbidden />;
  }
};

export default PrivateRoute;
