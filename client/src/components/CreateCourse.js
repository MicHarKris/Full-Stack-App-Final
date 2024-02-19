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

  const navigate = useNavigate();

  // State
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);
//   const emailAddress = useRef(null);
//   const password = useRef(null);
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

    // Try to create course
    try {
      // Send course object to API, with options
      const response = await api("/courses", "POST", course);
      if (response.status === 201) {
        // If created, navigate to home
        console.log(`Course ${course.title} is successfully created!`);
        navigate("/");
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
