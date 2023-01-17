import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../API/firebase";
import { GetUserData } from "../../API/getUserData";
import { ProjectsData } from "../../API/getUserData";
interface props {
  children: React.ReactNode;
}

interface provider {
  primary: {
    primaryColor: number;
    setPrimaryColor: React.Dispatch<React.SetStateAction<number>>;
  };
  secondary: {
    secondaryColor: string;
    setSecondaryColor: React.Dispatch<React.SetStateAction<string>>;
  };
  text: {
    textColor: number;
    setTextColor: React.Dispatch<React.SetStateAction<number>>;
  };
  newColor: {
    newColor: number;
    setNewColor: React.Dispatch<React.SetStateAction<number>>;
  };
  displayMode: {
    displayMode: string;
    setDisplayMode: React.Dispatch<React.SetStateAction<string>>;
  };
  currentWindow: {
    id: number;
    set: React.Dispatch<React.SetStateAction<number>>;
  };
  userData: ProjectsData[];
  currentUser: User | null | undefined;
}
export const appContext = createContext<provider>({} as provider);
/**
 * @desc Context Provider for App
 */
// localStorage.setItem("mode", "dark");
const Provider: React.FC<props> = (props) => {
  // main Colors to set by user
  const [backgroundColor, setBackgroundColor] = useState("#6e6e6ea5");
  const [primaryColor, setPrimaryColor] = useState(200);
  const [secondaryColor, setSecondaryColor] = useState("#c5dc14");
  const [textColor, setTextColor] = useState(20);
  const [newColor, setNewColor] = useState(153);
  const [displayMode, setDisplayMode] = useState(
    localStorage.getItem("mode") as string
  );
  const [currenWindow, setCurrentWindow] = useState(0);
  // const [userData,setUserData] = useState(GetUserData())
  const currentUser = useAuth();
  const userData = GetUserData();
  return (
    <appContext.Provider
      value={{
        primary: { primaryColor, setPrimaryColor },
        secondary: { secondaryColor, setSecondaryColor },
        text: { textColor, setTextColor },
        newColor: { newColor, setNewColor },
        userData,
        currentWindow: { id: currenWindow, set: setCurrentWindow },
        displayMode: { displayMode, setDisplayMode },
        currentUser,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default Provider;
