// USerContext.js.js
import { createContext, useState } from "react";

// Cookie
import Cookies from "js-cookie";

// API
import { api } from "../utils/apiHelper";

// Context
const UserContext = createContext(null);

// UserProvider component
export const UserProvider = (props) => {
  // Get authenticatedUser cookie value (if there is one) - returns string or undefined
  const authUserCookie = Cookies.get("authenticatedUser");
  // Set authUser state to cookie value (if there is one), or null otherwise - returns object or null
  const [authUser, setAuthUser] = useState(
    authUserCookie ? JSON.parse(authUserCookie) : null
  );

  const signIn = async (credentials) => {
    // Base64 encode credentials
    const response = await api("/users", "GET", null, credentials);
    if (response.status === 200) {
      // If authenticated, sign in user
      const user = await response.json();
      user.password = credentials.password;
      setAuthUser(user);
      // Set cookie - named 'authenticatedUser', with values taken from user, that expires in 1 day
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
      return user;
    } else if (response.status === 401) {
      // If not authenticated, return null
      return null;
    } else {
      // If other error, throw error
      throw new Error();
    }
  };

  // Sign out user; set authUser state to null and remove cookie named 'authenticatedUser'
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  // Update course; send PUT request to API with course object and id
  const updateCourse = async (id, course, credentials) => {
    const response = await api(`/courses/${id}`, "PUT", course, credentials);
    if (response.status === 204) {
      return null;
    } else if (!response.ok) {
      throw new Error();
    }
  };

  // Delete course; send DELETE request to API with id
  const deleteCourse = async (id, credentials) => {
    const response = await api(`/courses/${id}`, "DELETE", null, credentials);
    if (response.status === 204) {
      return null;
    } else if (!response.ok) {
      throw new Error();
    }
  };

  // Return UserProvider with authUser state, and signIn and signOut actions
  return (
    <UserContext.Provider
      value={{
        authUser,
        actions: {
          signIn,
          signOut,
          updateCourse,
          deleteCourse,
        },
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
