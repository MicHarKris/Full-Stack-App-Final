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

    // Set from to location state, or default to authenticated
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
      // Send user object to API, with options
      const response = await api("/users", "POST", user);
      if (response.status === 201) {
        // If created, sign in user
        console.log(
          `${
            user.firstName + " " + user.lastName
          } is successfully signed up and authenticated!`
        );
        // Sign in user with credentials & navigate to 'from'
        await actions.signIn(credentials);
        navigate(from);
      } else if (response.status === 400) {
        // If bad request, set errors
        const data = await response.json();
        setErrors(data.errors);
      } else {
        // If other error, throw error
        throw new Error();
      }
    } catch (error) {
      // Catch any errors and log to console, and navigate to error page
      console.log(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

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
