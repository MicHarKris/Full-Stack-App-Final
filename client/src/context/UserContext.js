import { createContext, useState } from "react";

// Cookie 
import Cookies from "js-cookie";

// API
import {api} from "../utils/apiHelper";

// Context
const UserContext = createContext(null);

// UserProvider component
export const UserProvider = (props) => {
  // Get authenticatedUser cookie value (if there is one) - returns string or undefined
  const authUserCookie = Cookies.get("authenticatedUser");
  // Set authUser state to cookie value (if there is one), or null otherwise - returns object or null
  const [authUser, setAuthUser] = useState(authUserCookie ? JSON.parse(authUserCookie) : null);

  const signIn = async (credentials) => {
    // Base64 encode credentials
    const response = await api("/users", "GET", null, credentials);
      if (response.status === 200) {
      // If authenticated, sign in user
      const user = await response.json();
      setAuthUser(user);
      // Set cookie - named 'authenticatedUser', with values taken from user, that expires in 1 day
      Cookies.set("authenticatedUser", JSON.stringify(user),{expires: 1});
      return user
    } else if (response.status === 401) {
      // If not authenticated, return null
      return null
    } else {
      // If other error, throw error
      throw new Error();
    }
}

  // Sign out user; set authUser state to null and remove cookie named 'authenticatedUser'
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  }

  // Return UserProvider with authUser state, and signIn and signOut actions
  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;