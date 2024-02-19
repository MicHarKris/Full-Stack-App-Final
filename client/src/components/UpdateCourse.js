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
          // Check if the authenticated user is the owner of the course
          if (authUser.id !== courseData.User.id) {
            // Redirect to unauthorized page or display an error message
            navigate("/unauthorized");
          }
        } else if (response.status === 404) {
          // Handle case where course is not found
          navigate("/not-found");
        } else {
          throw new Error();
        }
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

    const updatedCourse = {
      userId: authUser.id,
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    // Create a unique identifier for the DeleteCourse component, with the course ID and the authenticated user's ID
    // added the ?. 'optional chaining operator' to ensure that it does not render without an assigned .id value
    const identifier = `${id}-${authUser?.id}`;

    try {
      const response = await api(
        `/courses/${identifier}`,
        "PUT",
        updatedCourse
      );
      if (response.status === 204) {
        // If updated, navigate to course details page
        navigate(`/courses/${id}`);
      } else if (response.status === 400) {
        // If bad request, set errors
        const data = await response.json();
        setErrors(data.errors);
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      navigate("/error");
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    // Redirect to course details page
    navigate(`/courses/${id}`);
  };

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
