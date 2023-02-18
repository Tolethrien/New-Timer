import { ThemeMode } from "../../providers/themeProvider";

type ColorList =
  | "appColorPrimary"
  | "appColorSecondary"
  | "projectCardColorTone"
  | "projectCardSecondaryColorTone"
  | "projectCardProgressBarColorTone"
  | "projectCardProgressBarValueColor"
  | "taskTemplateColor"
  | "dynamicShadowColor"
  | "staticShadowColor"
  | "borderColor"
  | "itemCardColor"
  | "iconColor"
  | "textColorNormal"
  | "textColorLight"
  | "buttonColor"
  | "categoryColor"
  | "categoryDanger"
  | "categoryActive"
  | "categoryOnHold"
  | "categoryDone"
  | "textError"
  | "buttonWithIconColor"
  | "showMoreButtonColor"
  | "dropMenuOptionColor"
  | "dropMenuOptionBorderColor"
  | "taskOptionToggleColor"
  | "taskOptionsForegroundColor"
  | "footerActiveIconColor"
  | "footerInActiveIconColor"
  | "footerBackgroundColor"
  | "clockPrimaryColor"
  | "clockSecondaryColor"
  | "clockGlowColor"
  | "clockBackgroundColor";

type ColorKeys = { [color in ColorList]: string };
type ColorMap = { [Theme in ThemeMode]: ColorKeys };
export const APP_COLORS: ColorMap = {
  Light: {
    appColorPrimary: "hsla(40, 76%, 69%, 0.8)",
    appColorSecondary: "hsla(359, 70%, 79%, 0.8)",
    projectCardColorTone: "80%",
    projectCardSecondaryColorTone: "70%",
    projectCardProgressBarColorTone: "70%",
    projectCardProgressBarValueColor: `hsla(0, 0%, 30%, 1)`,
    taskTemplateColor: "hsla(40, 76%,70%,0.5)",
    dynamicShadowColor: "hsla(0, 0%, 0%, 0.25)",
    staticShadowColor: "hsla(0, 0%, 0%, 0.25)",
    borderColor: "hsla(0, 0%, 80%, 1)",
    itemCardColor: "hsla(0, 0%, 100%, 0.6)",
    iconColor: "brightness(0) invert(0.3)",
    textColorNormal: "hsla(0, 0%, 25%, 1)",
    textColorLight: "hsla(0, 0%, 40%, 100%)",
    buttonColor: "hsla(0, 0%, 87%, 0.22)",
    categoryColor: "hsla(245, 84%, 85%, 1)",
    categoryDanger: "hsla(0,100%,50%,1)",
    categoryActive: "hsla(185, 50%, 70%, 1)",
    categoryOnHold: "hsla(28, 50%, 80%, 1)",
    categoryDone: "hsla(95, 50%, 80%, 1)",
    textError: "hsla(10, 74%, 50%, 1)",
    buttonWithIconColor: "hsla(40, 0%, 80%, 0.3)",
    showMoreButtonColor: "hsla(0, 0%, 87%, 0.68)",
    dropMenuOptionColor: "hsla(0, 0%, 87%, 0.5)",
    dropMenuOptionBorderColor: "hsla(0, 0%, 66%, 1)",
    taskOptionToggleColor: "hsla(0, 5%, 40%, 1)",
    taskOptionsForegroundColor: "hsla(0, 0%, 85%, 0.4)",
    footerActiveIconColor: "hsla(287,55%,63%,0.6)",
    footerInActiveIconColor: "hsla(40, 76%, 69%, 0.8)",
    footerBackgroundColor: "hsla(360, 90%, 14%, 0.19)",
    clockPrimaryColor: "hsla(32, 86%, 83%, 1)",
    clockSecondaryColor: "hsla(160, 70%, 60%, 1)",
    clockGlowColor: "hsla(20, 100%, 50%,0.5)",
    clockBackgroundColor: "hsla(32, 86%, 83%, 0.5)",
  },
  Dark: {
    appColorPrimary: "hsla(261, 16%, 40%, 0.8)",
    appColorSecondary: "hsla(341, 26%, 22%, 0.8)",
    projectCardColorTone: "20%",
    projectCardSecondaryColorTone: "30%",
    projectCardProgressBarColorTone: "30%",
    projectCardProgressBarValueColor: "hsla(0, 0%, 70%, 1)",
    taskTemplateColor: "hsla(260,26%,65%,0.5)",
    dynamicShadowColor: "hsla(0, 0%, 100%, 0.25)",
    staticShadowColor: "hsla(0, 0%, 0%, 0.25)",
    borderColor: "hsla(0, 0%, 45%, 1)",
    itemCardColor: "hsla(0, 0%, 35%, 0.6)",
    iconColor: "brightness(0) invert(0.7)",
    textColorNormal: "hsla(0, 0%, 80%, 1)",
    textColorLight: "hsla(0, 0%, 65%, 100%)",
    buttonColor: "hsla(0, 0%, 87%, 0.22)",
    categoryColor: "hsla(245, 84%, 15%, 1)",
    textError: "hsla(10, 74%, 40%, 1)",
    buttonWithIconColor: "hsla(261, 0%, 55%, 0.3)",
    showMoreButtonColor: "hsla(0, 0%, 87%, 0.68)",
    dropMenuOptionColor: "hsla(0, 0%, 87%, 0.5)",
    dropMenuOptionBorderColor: "hsla(0, 0%, 66%, 1)",
    taskOptionToggleColor: "hsla(0, 5%, 85%, 1)",
    taskOptionsForegroundColor: "hsla(0, 0%, 85%, 0.4)",
    categoryDanger: "hsla(0,70%,20%,1)",
    categoryActive: "hsla(185, 80%, 15%, 1)",
    categoryOnHold: "hsla(28, 80%, 15%, 1)",
    categoryDone: "hsla(95, 80%, 15%, 1)",
    footerActiveIconColor: "hsla(344,39%,27%,0.6)",
    footerInActiveIconColor: "hsla(261, 16%, 40%, 0.8)",
    footerBackgroundColor: "hsla(360, 90%, 14%, 0.19)",
    clockPrimaryColor: "hsla(200, 70%, 60%, 1)",
    clockSecondaryColor: "hsla(320, 70%, 60%, 1)",
    clockGlowColor: "hsla(108, 100%, 50%,0.5)",
    clockBackgroundColor: "hsla(200, 70%, 60%, 0.5)",
  },
};
