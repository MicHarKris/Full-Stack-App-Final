// DeleteCourse.js
import React from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Context
import UserContext from "../context/UserContext";

// Utils
import { api } from "../utils/apiHelper";

const DeleteCourse = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // Credentials object to send to API
  const credentials = {
    email: authUser.emailAddress,
    password: authUser.password,
  };

  const handleDelete = async () => {
    try {
      const response = await api(`/courses/${id}`, "DELETE", null, credentials);
      // If successful, navigate to home
      if (response.status === 204) {
        console.log(`Course ${id} is successfully deleted!`);
        navigate("/");
        // Error handling for other status codes
      } else if (!response.ok) {
        // Handle case where server route is not found
        if (response.status === 404) {
          console.log("Route not found");
          navigate("/notfound");
          return; // Exit the function to prevent further processing
          // Handle case where server error occurs
        } else if (response.status === 403) {
          console.log("You are not authorized to update this course");
          navigate("/forbidden");
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
      console.log(error);
      navigate("/error");
    }
  };

  // Render the delete button
  return (
    <button className="button" onClick={handleDelete}>
      Delete Course
    </button>
  );
};

export default DeleteCourse;
