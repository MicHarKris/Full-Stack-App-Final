// CourseDetail.js
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link } from "react-router-dom";

// Components
import DeleteCourse from "./DeleteCourse";

// Context
import UserContext from "../context/UserContext";

const CourseDetail = () => {
  // Context
  const { authUser } = useContext(UserContext);

  // Hooks
  const navigate = useNavigate();
  const { id } = useParams();

  // State
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // Fetch course data from the API
    const fetchCourse = async () => {
      try {
        const response = await fetch(`https://full-stack-app.up.railway.app/api/courses/${id}`);
        // If the response is successful, set the course state
        if (response.ok) {
          const courseData = await response.json();
          setCourse(courseData);
          // Error handling for other status codes
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
        console.error(error);
        navigate("/error");
      }
    };

    fetchCourse();
  }, [id, navigate]);

  /* -- This code was replaced by the ReactMarkdown component --
      But it is kept here for reference purposes --
  // const renderDescription = () => {
  //   // Split description into paragraphs using regex
  //   const paragraphs = course.description.split(/\n\s*\n/);

  //   // Map each paragraph to a <p> element
  //   return paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>);
  // };

  // const renderMaterials = () => {
  //   // Split materials into paragraphs using regex
  //   const paragraphs = course.materialsNeeded.split(/\n/);

  //   // Map each paragraph to a <p> element
  //   return paragraphs.map((paragraph, index) => (
  //     <li key={index}>{paragraph}</li>
  //   ));
  // };
*/

  // If course is not loaded, display loading message, otherwise display course details
  if (!course) {
    return <p>Loading...</p>;
  }

  // Render the course details
  return (
    <>
      {/* Actions bar above the course details */}
      <div className="actions--bar">
        <div className="wrap">
          {/* Hidden Update and Delete buttons, revealed when authUser.id matches course.userId */}
          {/* added the ?. 'optional chaining operator' to ensure that it does not render without an assigned .id value*/}
          {authUser?.id === course.User.id && <DeleteCourse/>}

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

              {/* Render the course description using ReactMarkdown */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {course.description}
              </ReactMarkdown>

              {/* Render the course description, paragraph by paragraph
              {renderDescription()} */}
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

                  {/* Render the Materials using ReactMarkdown */}
                  <ReactMarkdown className="course--detail--list">
                    {course.materialsNeeded}
                  </ReactMarkdown>

                  {/* Render the Materials, item by item
                  <ul className="course--detail--list">{renderMaterials()}</ul> */}
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
