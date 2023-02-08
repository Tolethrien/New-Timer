import { useContext } from "react";
import { themeContext } from "../providers/themeProvider";
import { APP_COLORS } from "../styled/colors/appColors";
import { APP_BACKGROUNDS } from "../styled/backgrounds/appBackgrounds";

export type ThemeMode = "light" | "dark";

const useTheme = () => {
  const { theme, switchTheme, switchCategoryColor, coloredCategory } =
    useContext(themeContext);
  const getColor = APP_COLORS[theme as ThemeMode];
  const getBackground = APP_BACKGROUNDS[theme as ThemeMode];
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
