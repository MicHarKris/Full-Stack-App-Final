// CreateCourse.js
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ErrorsDisplay from "./ErrorsDisplay";

// Utils
import { api } from "../utils/apiHelper";

// Context
import UserContext from "../context/UserContext";

const CreateCourse = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();

  // State
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
  const [errors, setErrors] = useState([]);

  // event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Course object to send to API
    const course = {
      userId: authUser.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    try {
      const response = await api("/courses", "POST", course);
      // If created, navigate to home
      if (response.status === 201) {
        console.log(`Course ${course.title} is successfully created!`);
        navigate("/");
        // If bad request, set errors
      } else if (!response.ok) {
        // Handle case where server error occurs
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
          // Handle case where server route is not found
        } else if (response.status === 404) {
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

  // Cancel button event handler
  const handleCancel = (event) => {
    event.preventDefault();
    navigate("/");
  };

  // Render the form
  return (
    <div className="wrap">
      <h2>Create Course</h2>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          {/* First half of FlexBox */}
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              ref={courseTitle}
            />
            <p>By {authUser.firstName + " " + authUser.lastName}</p>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              type="text"
              ref={courseDescription}
            />
          </div>
          {/* Second half of FlexBox */}
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              ref={estimatedTime}
            />
            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              type="text"
              ref={materialsNeeded}
            />
          </div>
        </div>
        <button className="button" type="submit">
          Create Course
        </button>
        <button className="button button-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
