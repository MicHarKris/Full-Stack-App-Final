import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Function to fetch course data
    const fetchCourses = async () => {
      try {
        // Fetch the response from the API
        const response = await fetch("http://localhost:5000/api/courses");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const coursesData = await response.json();
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    // Call the fetchCourses function
    fetchCourses();
  }, []); // Empty dependency array ensures that the effect runs once when the component mounts

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

      <Link to={`/createcourse`} className="course--module course--add--module">
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
