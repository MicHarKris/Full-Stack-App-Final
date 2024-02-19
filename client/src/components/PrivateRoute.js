// PrivateRoute.js
import { useContext } from "react";
import { Outlet } from "react-router-dom";

// Components
import Unauthorized from "./Unauthorized";

// Context
import UserContext from "../context/UserContext";

const PrivateRoute = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // If the user is authenticated, render the child components, otherwise show an error message
  if (authUser) {
    return <Outlet />;
  } else {
    // Error message for unauthorized users
    return (
      <Unauthorized />
    );
  }
};

export default PrivateRoute;
