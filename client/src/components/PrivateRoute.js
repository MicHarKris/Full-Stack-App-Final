import { useContext } from "react";
import { Outlet } from "react-router-dom";

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
      <div className="wrap">
        <h2>Forbidden</h2>
        <p>Oh oh! You can't access this page.</p>
      </div>
    );
  }
};

export default PrivateRoute;
