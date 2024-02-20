// UserSignIn.js
import { useContext, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

// Components
import ErrorsDisplay from "./ErrorsDisplay";

// Context
import UserContext from "../context/UserContext";

const UserSignIn = () => {
  // Context
  const { actions } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();
  const location = useLocation();

  // State
  const email = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);

  // Event Handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set from to location state, or default to the root
    let from = "/";
    if (location.state) {
      from = location.state.from;
    }

    // Credentials object to send to API
    const credentials = {
      email: email.current.value,
      password: password.current.value,
    };

    // Try to sign in user
    try {
      const user = await actions.signIn(credentials);
      // If user is not null, navigate to from
      if (user !== null) {
        navigate(from);
      } else {
        setErrors(["Sign-in was unsuccessful"]);
      }
      // Catch any errors and log to console
    } catch (error) {
      console.log(error);
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
      <h2>Sign In</h2>
        <ErrorsDisplay errors={errors} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input 
            id="email" 
            name="email" 
            type="text" 
            ref={email} 
          />
          <label htmlFor="email">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            ref={password}
          />
            <button className="button" type="submit">
              Sign in
            </button>
            <button className="button button-secondary" onClick={handleCancel}>
              Cancel
            </button>
        </form>
      <p>
        Don't have a user account? Click here to <Link to="/signup">sign
        up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
