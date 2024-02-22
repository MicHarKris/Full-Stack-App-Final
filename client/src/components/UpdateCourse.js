// UpdateCourse.js
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import ErrorsDisplay from "./ErrorsDisplay";

// Utils
import { api } from "../utils/apiHelper";

// Context
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [course, setCourse] = useState(null);
  const [errors, setErrors] = useState([]);

  // Refs
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const estimatedTime = useRef(null);
  const materialsNeeded = useRef(null);

  // Fetch course data on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api(`/courses/${id}`);
        if (response.status === 200) {
          const courseData = await response.json();
          setCourse(courseData);
          // Check if the user is the owner of the course, otherwise redirect to forbidden
          if (authUser.id !== courseData.User.id) {
            console.log("You are not authorized to update this course");
            navigate("/forbidden");
            return; // Exit the function to prevent further processing
          }
          // Error handling for other status codes
        } else if (!response.ok) {
          // Handle case where server route is not found
          if (response.status === 404) {
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

    fetchCourse();
  }, [id, authUser.id, navigate]);

  // Event handlers
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Course object to send to API
    const updatedCourse = {
      userId: authUser.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    // Credentials object to send to API
    const credentials = {
      email: authUser.emailAddress,
      password: authUser.password,
    };

    try {
      const response = await api(
        `/courses/${id}`,
        "PUT",
        updatedCourse,
        credentials
      );
      if (response.status === 204) {
        // If updated, navigate to course details page
        navigate(`/courses/${id}`);
        // Error handling for other status codes
      } else if (!response.ok) {
        // if bad request, set errors
        if (response.status === 400) {
          const data = await response.json();
          setErrors(data.errors);
          // Handle case where server route is not found
        } else if (response.status === 404) {
          console.log("Route not found");
          navigate("/not-found");
          return; // Exit the function to prevent further processing
          // Handle case where server error occurs
        } else if (response.status === 403) {
          console.log("You are not authorized to update this course");
          navigate("/forbidden");
          return; // Exit the function to prevent further processing
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
    navigate(`/courses/${id}`);
  };

  // Render the form
  return (
    <div className="wrap">
      <h2>Update Course</h2>
      {course && (
        <form onSubmit={handleSubmit}>
          <ErrorsDisplay errors={errors} />
          <div className="main--flex">
            {/* First half of FlexBox */}
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                defaultValue={course.title}
                ref={courseTitle}
              />
              <p>By {authUser.firstName + " " + authUser.lastName}</p>
              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                type="text"
                defaultValue={course.description}
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
                defaultValue={course.estimatedTime}
                ref={estimatedTime}
              />
              <label htmlFor="materialsNeeded">Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                type="text"
                defaultValue={course.materialsNeeded}
                ref={materialsNeeded}
              />
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateCourse;
