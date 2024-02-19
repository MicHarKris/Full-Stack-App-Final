// DeleteCourse.js
import React from "react";
import { useNavigate } from "react-router-dom"; 

// Utils
import { api } from "../utils/apiHelper";

const DeleteCourse = ({id}) => {
  
  const navigate = useNavigate(); // Use the navigate function from the router

  const handleDelete = async () => {
    try {
      // Make a DELETE request using the api helper
      const response = await api(`/courses/${id}`, "DELETE");
      if (response.ok) {
        // If the request is successful, log a message to the console
        console.log(`Course deleted successfully`);
        // Navigate back to the home page
        navigate("/");
      } else {
        // If there's an error, log the error message to the console
        const errorMessage = `Error deleting course: ${response.statusText}`;
        console.log(errorMessage);
      }
    } catch (error) {
      // Handle network or other errors
      console.log(`Error deleting course: ${error.message}`);
    }
  };
  
  return (
    <button className="button" onClick={handleDelete}>
      Delete Course
    </button>
  );
};

export default DeleteCourse;
