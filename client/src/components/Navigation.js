import { useContext } from "react";
import { Link } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

const Navigation = () => {
  // Context
  const { authUser } = useContext(UserContext);

  return (
    <nav>
        {authUser === null ? (
      <ul className="header--signedout">
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
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
