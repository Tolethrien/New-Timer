import { ThemeMode } from "../providers/themeProvider";

export interface ThemeState {
  theme: ThemeMode;
  coloredCategory: string;
  coloredHeaders: string;
}
export type themeDispatch = {
  type: "switchThemeColor" | "switchCategoryColor" | "switchHeaderColor";
};
export const themeReducer = (
  state: ThemeState,
  action: themeDispatch
): ThemeState => {
  switch (action.type) {
    case "switchThemeColor": {
      localStorage.setItem(
        "themeProvider",
        JSON.stringify({
          ...state,
          theme: state.theme === "Dark" ? "Light" : "Dark",
        })
      );
      return { ...state, theme: state.theme === "Dark" ? "Light" : "Dark" };
    }
    case "switchCategoryColor": {
      localStorage.setItem(
        "themeProvider",
        JSON.stringify({
          ...state,
          coloredCategory:
            state.coloredCategory === "Mono" ? "Colorful" : "Mono",
        })
      );
      return {
        ...state,
        coloredCategory: state.coloredCategory === "Mono" ? "Colorful" : "Mono",
      };
    }
    case "switchHeaderColor": {
      localStorage.setItem(
        "themeProvider",
        JSON.stringify({
          ...state,
          coloredHeaders: state.coloredHeaders === "Mono" ? "Colorful" : "Mono",
        })
      );
      return {
        ...state,
        coloredHeaders: state.coloredHeaders === "Mono" ? "Colorful" : "Mono",
      };
    }
    default:
      return state;
  }
};
