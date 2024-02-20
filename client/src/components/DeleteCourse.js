// DeleteCourse.js
import React from "react";
import { useNavigate } from "react-router-dom";

// Utils
import { api } from "../utils/apiHelper";

const DeleteCourse = ({ id }) => {
  // Hooks
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await api(`/courses/${id}`, "DELETE");
      // If successful, navigate to home
      if (response.ok) {
        console.log(`Course deleted successfully`);
        navigate("/");
      } else if (!response.ok) {
        // Handle case where server route is not found
        if (response.status === 404) {
          console.log("Route not found");
          navigate("/notfound");
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
