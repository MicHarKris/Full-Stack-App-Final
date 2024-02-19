// CourseDetail.js
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

// Components
import DeleteCourse from "./DeleteCourse";

// Context
import UserContext from "../context/UserContext";

const CourseDetail = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Get the course ID from the URL
  const { id } = useParams();
  
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Function to fetch course data
    const fetchCourse = async () => {
      try {
        // Fetch the response from the API
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const courseData = await response.json();
        setCourse(courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    // Call the fetchCourse function
    fetchCourse();
  }, [id]); // Dependency array ensures that the effect runs when the component mounts and when the ID changes

  const renderDescription = () => {
    // Split description into paragraphs using regex
    const paragraphs = course.description.split(/\n\s*\n/);

    // Map each paragraph to a <p> element
    return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  };

  const renderMaterials = () => {
    // Split materials into paragraphs using regex
    const paragraphs = course.materialsNeeded.split(/\n/);

    // Map each paragraph to a <p> element
    return paragraphs.map((paragraph, index) => (
      <li key={index}>{paragraph}</li>
    ));
  };

  // If course is not loaded, display loading message, otherwise display course details
  if (!course) {
    return <p>Loading...</p>;
  }

  // Create a unique identifier for the DeleteCourse component, with the course ID and the authenticated user's ID
  // added the ?. 'optional chaining operator' to ensure that it does not render without an assigned .id value
  const identifier = `${id}-${authUser?.id}`;

  return (
    <>
      {/* Actions bar above the course details */}
      <div className="actions--bar">
        <div className="wrap">

          {/* Hidden Update and Delete buttons, revealed when authUser.id matches course.userId */}
          {/* added the ?. 'optional chaining operator' to ensure that it does not render without an assigned .id value*/}
          {authUser?.id === course.User.id && <DeleteCourse id={identifier} />}
         
          {authUser?.id === course.User.id ? (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
            </>
          ) : null}

          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>

      {/* Course details */}
      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>
                By {course.User.firstName} {course.User.lastName}
              </p>

              {/* Render the course description, paragraph by paragraph */}
              {renderDescription()}
            </div>
            <div>

              {/* Conditional rendering for Estimated Time */}
              {course.estimatedTime ? (
                <>
                  <h3 className="course--detail--title">Estimated Time</h3>
                  {<p>{course.estimatedTime}</p>}
                </>
              ) : null}

              {/* Conditional rendering for Materials Needed */}
              {course.materialsNeeded ? (
                <>
                  <h3 className="course--detail--title">Materials Needed</h3>
                  {/* Render the Materials, item by item */}
                  <ul className="course--detail--list">{renderMaterials()}</ul>
                </>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;
