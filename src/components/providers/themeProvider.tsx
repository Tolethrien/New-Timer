import { createContext, useReducer } from "react";
import {
  themeDispatch,
  themeReducer,
  ThemeState,
} from "../reducers/themeReducer";
interface ThemeProviderProps {
  children: React.ReactNode;
}
interface provider {
  themeState: ThemeState;
  dispatch: React.Dispatch<themeDispatch>;
}
export type ThemeMode = "Light" | "Dark";

// IMPORTANT!!!
// set new value if you making any theme changes
// to clear user localstorage
const LOCAL_STORAGE_CONTROL_VERSION = "0.01a";

export const themeContext = createContext({} as provider);

const localStorageControlVersionCheck = () => {
  //check control version and clear local storage when diffrent
  if (
    localStorage.getItem("themeProvider") &&
    JSON.parse(localStorage.getItem("themeProvider")!)[
      "localStorageControlVersion"
    ] !== LOCAL_STORAGE_CONTROL_VERSION
  )
    localStorage.removeItem("themeProvider");
  // if localStorage is empty create new instance of theme
  if (!localStorage.getItem("themeProvider"))
    localStorage.setItem(
      "themeProvider",
      JSON.stringify({
        theme: "Light",
        coloredCategory: "Mono",
        coloredHeaders: "Mono",
        localStorageControlVersion: LOCAL_STORAGE_CONTROL_VERSION,
      })
    );
};
const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  //handle localStorage
  localStorageControlVersionCheck();

  //set reducer based on LS
  const [themeState, dispatch] = useReducer(themeReducer, {
    ...JSON.parse(localStorage.getItem("themeProvider")!),
    theme: JSON.parse(localStorage.getItem("themeProvider")!)[
      "theme"
    ] as ThemeMode,
  });

  return (
    <themeContext.Provider value={{ themeState, dispatch }}>
      {children}
    </themeContext.Provider>
  );
};
export default ThemeProvider;
