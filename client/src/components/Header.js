import { Link } from "react-router-dom";

// Components
import Navigation from "./Navigation";

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
      <h1 className="header--logo">
        <Link to="/">
          Courses
        </Link>
      </h1>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
