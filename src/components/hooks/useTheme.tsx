import { useContext } from "react";
import { themeContext } from "../providers/themeProvider";
import { APP_COLORS } from "../styled/colors/appColors";
import { APP_BACKGROUNDS } from "../styled/backgrounds/appBackgrounds";

const useTheme = () => {
  const { theme, switchTheme, switchCategoryColor, coloredCategory } =
    useContext(themeContext);
  const getColor = APP_COLORS[theme];
  const getBackground = APP_BACKGROUNDS[theme];
  return {
    theme,
    switchTheme,
    getColor,
    getBackground,
    switchCategoryColor,
    coloredCategory,
  };
};
export default useTheme;
