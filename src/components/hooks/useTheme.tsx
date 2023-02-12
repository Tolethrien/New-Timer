import { useContext } from "react";
import { themeContext } from "../providers/themeProvider";
import { APP_COLORS } from "../styled/colors/appColors";
import { APP_BACKGROUNDS } from "../styled/backgrounds/appBackgrounds";

const useTheme = () => {
  const {
    dispatch,
    themeState: { coloredCategory, theme, coloredHeaders },
  } = useContext(themeContext);
  const getColor = APP_COLORS[theme];
  const getBackground = APP_BACKGROUNDS[theme];
  return {
    theme,
    dispatch,
    getColor,
    getBackground,
    coloredCategory,
    coloredHeaders,
  };
};
export default useTheme;
