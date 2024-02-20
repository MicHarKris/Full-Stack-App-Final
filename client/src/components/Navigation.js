// Navigation.js
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

// Navigation component
const Navigation = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Hooks
  const location = useLocation();

  // If the user is not authenticated, display the "Sign Up" and "Sign In" links
  return (
    <nav>
      {authUser === null ? (
        <ul className="header--signedout">
          <>
            <li>
              <Link to="/signup" state={{from: location.pathname}}>Sign Up</Link>
            </li>
            <li>
              <Link to="/signin" state={{from: location.pathname}}>Sign In</Link>
            </li>
          </>
        </ul>
      ) : (
        <>
          <ul className="header--signedin">
            <li>Welcome, {authUser.firstName + " " + authUser.lastName}!</li>
            <li>
              <Link className="signout" to="/signout">
                Sign Out
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
};

export default Navigation;
