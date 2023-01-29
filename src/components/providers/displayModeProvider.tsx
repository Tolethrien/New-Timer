import { createContext, useState } from "react";
interface DisplayModeProviderProps {
  children: React.ReactNode;
}
interface provider {
  displayMode: string;
  switchDisplayMode: () => void;
}
export const DisplayModeContext = createContext({} as provider);

const DisplayModeProvider: React.FC<DisplayModeProviderProps> = ({
  children,
}) => {
  if (!localStorage.getItem("mode")) localStorage.setItem("mode", "light");

  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem("mode") as string
  );

  const switchDisplayMode = () => {
    if (displayMode === "light") {
      localStorage.setItem("mode", "dark");
      setDisplayMode("dark");
    } else if (displayMode === "dark") {
      localStorage.setItem("mode", "light");
      setDisplayMode("light");
    }
  };
  return (
    <DisplayModeContext.Provider value={{ displayMode, switchDisplayMode }}>
      {children}
    </DisplayModeContext.Provider>
  );
};
export default DisplayModeProvider;
