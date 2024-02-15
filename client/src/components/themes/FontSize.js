import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const FontSize = () => {
  const { fontPercentage, accentColor, actions } = useContext(ThemeContext);

  return (
    <div>
      <h3>Adjust Font Size</h3>
      <input
        type="range"
        name="temp"
        list="tickmarks"
        min="50"
        max="250"
        step='25'
        value={fontPercentage}
        onChange={(e) => actions.updateFontPercentage(+e.target.value)}
        style={{ accentColor: accentColor }} />

      <datalist id="tickmarks">
        <option value="50" label="50%"></option>
        <option value="100" label="100%"></option>
        <option value="150" label="150%"></option>
        <option value="200" label="200%" ></option>
        <option value="250" label="250%" ></option>
      </datalist>

    </div>
  );
}

export default FontSize