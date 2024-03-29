// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";

// Styles
import "./styles/reset.css";
import "./styles/global.css";

// Components
import Header from "./components/Header";
import Courses from "./components/Courses";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import Forbidden from "./components/Forbidden";
import Error from "./components/UnhandledError";

// App component
function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Courses />} />
          <Route path="courses/:id" element={<CourseDetail />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="signin" element={<UserSignIn />} />
          <Route path="signout" element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="courses/create" element={<CreateCourse />} />
            <Route path="courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="error" element={<Error />} />
          <Route path="forbidden" element={<Forbidden />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
