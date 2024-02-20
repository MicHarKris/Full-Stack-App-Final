// Courses.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Courses = () => {
  // Hooks
  const navigate = useNavigate();

  // State
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        // Fetch the response from the API
        const response = await fetch("http://localhost:5000/api/courses");
        // If the response is successful, set the course state
        if (response.ok) {
          const coursesData = await response.json();
          setCourses(coursesData);
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

    // Call the fetchCourses function
    fetchCourses();
  }, [navigate]);

  // Render the courses
  return (
    <div className="wrap main--grid">
      {courses.map((course) => (
        <Link
          to={`/courses/${course.id}`}
          className="course--module course--link"
          key={course.id}
        >
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </Link>
      ))}

      <Link
        to={`courses/create`}
        className="course--module course--add--module"
      >
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add"
          >
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
};

export default Courses;
