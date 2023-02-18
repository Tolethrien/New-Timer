import mainLight from "./mainlight.webp";
import mainDark from "./maindark.webp";
import loginLight from "./loginlight.webp";
import loginDark from "./logindark.webp";
import { ThemeMode } from "../../providers/themeProvider";

type BackgroundList = "appBackground" | "loginBackground";
type BackgroundKeys = { [Background in BackgroundList]: string };
type BackgroundMap = { [P in ThemeMode]: BackgroundKeys };

export const APP_BACKGROUNDS: BackgroundMap = {
  Light: { appBackground: mainLight, loginBackground: loginLight },
  Dark: { appBackground: mainDark, loginBackground: loginDark },
};
