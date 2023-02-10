import { createContext, useState } from "react";
interface ThemeProviderProps {
  children: React.ReactNode;
}
interface provider {
  theme: ThemeMode;
  coloredCategory: string;
  switchTheme: () => void;
  switchCategoryColor: () => void;
}
export type ThemeMode = "light" | "dark";

export const themeContext = createContext({} as provider);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  if (!localStorage.getItem("mode")) localStorage.setItem("mode", "light");
  if (!localStorage.getItem("categoryColor"))
    localStorage.setItem("categoryColor", "Mono");

  const [theme, setTheme] = useState<ThemeMode>(
    localStorage.getItem("mode") as ThemeMode
  );
  const [coloredCategory, setcoloredCategory] = useState(
    localStorage.getItem("categoryColor") as string
  );

  const switchTheme = () => {
    if (theme === "light") {
      localStorage.setItem("mode", "dark");
      setTheme("dark");
    } else if (theme === "dark") {
      localStorage.setItem("mode", "light");
      setTheme("light");
    }
  };
  const switchCategoryColor = () => {
    if (coloredCategory === "Mono") {
      localStorage.setItem("categoryColor", "Colored");
      setcoloredCategory("Colored");
    } else if (coloredCategory === "Colored") {
      localStorage.setItem("categoryColor", "Mono");
      setcoloredCategory("Mono");
    }
  };
  return (
    <themeContext.Provider
      value={{ theme, switchTheme, switchCategoryColor, coloredCategory }}
    >
      {children}
    </themeContext.Provider>
  );
};
export default ThemeProvider;
