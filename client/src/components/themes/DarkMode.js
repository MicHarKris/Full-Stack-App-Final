import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const DarkMode = () => {
  const { isDarkMode, actions } = useContext(ThemeContext);

  return (
    <div>
      <h3>Dark Mode</h3>
      <input
        type='checkbox'
        className="darkMode-selector"
        checked={isDarkMode}
        onChange={() => actions.toggleDarkMode()} />
    </div>
  );
}

export default DarkMode;