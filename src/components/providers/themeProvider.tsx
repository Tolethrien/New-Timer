import { createContext, useState } from "react";
interface DisplayModeProviderProps {
  children: React.ReactNode;
}
interface provider {
  theme: string;
  switchTheme: () => void;
}
export const themeContext = createContext({} as provider);

const ThemeProvider: React.FC<DisplayModeProviderProps> = ({ children }) => {
  if (!localStorage.getItem("mode")) localStorage.setItem("mode", "light");

  const [theme, setTheme] = useState(localStorage.getItem("mode") as string);

  const switchTheme = () => {
    if (theme === "light") {
      localStorage.setItem("mode", "dark");
      setTheme("dark");
    } else if (theme === "dark") {
      localStorage.setItem("mode", "light");
      setTheme("light");
    }
  };
  return (
    <themeContext.Provider value={{ theme, switchTheme }}>
      {children}
    </themeContext.Provider>
  );
};
export default ThemeProvider;
