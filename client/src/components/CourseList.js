import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

const CourseList = () => {
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
        <a href="/" className="course--module course--link" key={course.id}>
          {/* <Link to={`/courses/${course.id}`}> */}
            <h2 className="course--label">Course</h2>
            <h3 className="course--title">{course.title}</h3>
          {/* </Link> */}
        </a>
      ))}
    </div>
  );
};

export default CourseList;
