import React from "react";
import { Route, Routes } from "react-router-dom";

// Styles
import "./styles/reset.css";
import "./styles/global.css";

// Components
import Header from "./components/Header";
import CourseList from "./components/CourseList";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="signin" element={<UserSignIn />} />
          <Route path="signout" element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            {/*  */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
