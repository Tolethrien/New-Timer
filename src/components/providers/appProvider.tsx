import { createContext, useState } from "react";
interface props {
  children: React.ReactNode;
}

interface provider {
  primary: {
    primaryColor: string;
    setPrimaryColor: React.Dispatch<React.SetStateAction<string>>;
  };
  secondary: {
    secondaryColor: string;
    setSecondaryColor: React.Dispatch<React.SetStateAction<string>>;
  };
  text: {
    textColor: string;
    setTextColor: React.Dispatch<React.SetStateAction<string>>;
  };
  vibration: {
    isVibrate: boolean;
    setIsVibrate: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
export const appContext = createContext<provider>({} as provider);
/**
 * @desc Context Provider for App
 */
const Provider: React.FC<props> = (props) => {
  // main Colors to set by user
  const [backgroundColor, setBackgroundColor] = useState("#6e6e6ea5");
  const [primaryColor, setPrimaryColor] = useState("#84bc7a7d");
  const [secondaryColor, setSecondaryColor] = useState("rgba(104,117,7,1)");
  const [textColor, setTextColor] = useState("#f8f8f8");
  const [isVibrate, setIsVibrate] = useState(true);
  return (
    <appContext.Provider
      value={{
        primary: { primaryColor, setPrimaryColor },
        secondary: { secondaryColor, setSecondaryColor },
        text: { textColor, setTextColor },
        vibration: { isVibrate, setIsVibrate },
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default Provider;
