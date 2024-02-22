// UserSignUp.js
import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Components
import ErrorsDisplay from "./ErrorsDisplay";

// Utils
import { api } from "../utils/apiHelper";

// Context
import UserContext from "../context/UserContext";

const UserSignUp = () => {
  // Context
  const { actions } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const firstName = useRef(null);
  const lastName = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set from to location state, or default to the root
    let from = "/";
    if (location.state) {
      from = location.state.from;
    }

    // User object to send to API
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: email.current.value,
      password: password.current.value,
    };

    // Credentials object to send to API
    const credentials = {
      email: email.current.value,
      password: password.current.value,
    };

    // Try to sign up user
    try {
      const response = await api("/users", "POST", user);
      // If created, sign in user with credentials & navigate to 'from'
      if (response.status === 201) {
        console.log(
          `${
            user.firstName + " " + user.lastName
          } is successfully signed up and authenticated!`
        );
        await actions.signIn(credentials);
        navigate(from);
          // Error handling for other status codes
      } else if (!response.ok) {
        // If bad request, set errors
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
        // Handle case where server route is not found
        } else if (response.status === 404) {
          console.log("Route not found");
          navigate("/not-found");
          return; // Exit the function to prevent further processing
          // Handle case where server error occurs
        } else if (response.status === 500) {
          console.log("Internal Server Error");
          navigate("/error");
          return; // Exit the function to prevent further processing
          // Handle other errors
        } else {
          throw new Error();
        }
      }
        // Error handling for network errors
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  // Cancel button event handler
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // Render the form
  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" name="firstName" type="text" ref={firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" name="lastName" type="text" ref={lastName} />
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" type="text" ref={email} />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" ref={password} />
        <button className="button" type="submit">
          Sign up
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
      <p>
        Already have a user account? Click here to <Link to="/signin">sign in</Link>
        !
      </p>
    </div>
  );
};

export default UserSignUp;
