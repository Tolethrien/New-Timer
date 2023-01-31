import { useContext } from "react";
import { DisplayModeContext } from "../providers/displayModeProvider";
import mainLight from "../../backgrounds/LofiMain.jpg";
import mainDark from "../../backgrounds/mainNight.jpg";
import loginLight from "../../backgrounds/loginLight.jpg";
import loginDark from "../../backgrounds/loginDark.jpg";

// type Colors = Record<Test, {}>;
interface ColorTypes {
  appColorPrimary: string;
  appColorSecondary: string;
  projectCardColorTone: string;
  projectCardSecondaryColorTone: string;
  projectCardProgressBarColorTone: string;
  projectCardProgressBarValueColor: string;
  taskTemplateColor: string;
  shadowColor: string;
  borderColor: string;
  itemCardColor: string;
  iconColor: string;
  textColorNormal: string;
  textColorLight: string;
  buttonColor: string;
  optionToggleColor: string;
  categoryColor: string;
}
interface BackgroundTypes {
  appBackground: string;
  loginBackground: string;
}
interface Colors {
  [key: string]: ColorTypes;
}
interface Backgrounds {
  [key: string]: BackgroundTypes;
}
const APP_COLORS: Colors = {
  light: {
    appColorPrimary: "hsla(40, 76%, 69%, 0.8)",
    appColorSecondary: "hsla(359, 70%, 79%, 0.8)",
    projectCardColorTone: "80%",
    projectCardSecondaryColorTone: "70%",
    projectCardProgressBarColorTone: "70%",
    projectCardProgressBarValueColor: `hsla(0, 0%, 30%, 1)`,
    taskTemplateColor: "hsla(40, 76%,70%,0.5)",
    shadowColor: "hsla(0, 0%, 0%, 0.25)",
    borderColor: "hsla(0, 0%, 80%, 1)",
    itemCardColor: "hsla(0, 0%, 100%, 0.6)",
    iconColor: "brightness(0) invert(0.3)",
    textColorNormal: "hsla(0, 0%, 25%, 1)",
    textColorLight: "hsla(0, 0%, 40%, 100%)",
    buttonColor: "hsla(0, 0%, 87%, 0.22)",
    optionToggleColor: "hsla(0, 5%, 40%, 1)",
    categoryColor: "hsla(245, 84%, 85%, 1)",
  },
  dark: {
    appColorPrimary: "hsla(261, 16%, 40%, 0.8)",
    appColorSecondary: "hsla(341, 26%, 22%, 0.8)",
    projectCardColorTone: "20%",
    projectCardSecondaryColorTone: "30%",
    projectCardProgressBarColorTone: "30%",
    projectCardProgressBarValueColor: "hsla(0, 0%, 70%, 1)",
    taskTemplateColor: "hsla(260,26%,65%,0.5)",
    shadowColor: "hsla(0, 0%, 100%, 0.25)",
    borderColor: "hsla(0, 2%, 58%, 1)",
    itemCardColor: "hsla(0, 0%, 35%, 0.6)",
    iconColor: "brightness(0) invert(0.7)",
    textColorNormal: "hsla(0, 0%, 80%, 1)",
    textColorLight: "hsla(0, 0%, 65%, 100%)",
    buttonColor: "hsla(0, 0%, 87%, 0.22)",
    optionToggleColor: "hsla(0, 5%, 88%, 1)",
    categoryColor: "hsla(245, 84%, 15%, 1)",
  },
};
const APP_BACKGROUNDS: Backgrounds = {
  light: { appBackground: mainLight, loginBackground: loginLight },
  dark: { appBackground: mainDark, loginBackground: loginDark },
};
const useTheme = () => {
  const { displayMode, switchDisplayMode } = useContext(DisplayModeContext);
  const getColor = APP_COLORS[displayMode];
  const getBackground = APP_BACKGROUNDS[displayMode];
  return { displayMode, switchDisplayMode, getColor, getBackground };
};
export default useTheme;
