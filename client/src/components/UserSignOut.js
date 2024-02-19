// UserSignOut.js
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

const UserSignOut = () => {
  const { actions } = useContext(UserContext);
  

  useEffect(() => {
    // Perform sign out logic
    actions.signOut();
  }, [actions]);

  // Use the 'replace' prop to replace the current entry in the history stack
  // This should prevent the user from going back to the previous page after signing out
  return <Navigate to="/" replace />;
};

export default UserSignOut;
