import React from "react";
import "./styles/global.css";

import Header from "./components/Header";
import CourseList from "./components/CourseList";

function App() {
  return (
    <div className="App">
      <Header />
      <CourseList />
    </div>
  );
}

export default App;
