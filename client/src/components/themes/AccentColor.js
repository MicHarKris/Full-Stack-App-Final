import { TwitterPicker } from 'react-color';
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";

const AccentColor = () => {
  const { accentColor, actions } = useContext(ThemeContext);

  return (
    <div>
      <h3>Accent Color</h3>
      <br />
      <TwitterPicker
        triangle="hide"
        width="400px"
        styles={{ 'default': { input: { color: null, boxSizing: null } } }}
        colors={['#F78DA7', '#FF5E5E', '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#63537d']}

        color={accentColor}
        onChange={(color) => actions.updateAccentColor(color.hex)} />
      <br />
    </div>
  )
}

export default AccentColor