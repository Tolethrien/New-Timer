import { createContext } from "react";
import { GetUserData } from "../../API/getUserData";
import { ProjectsData } from "../../API/getUserData";
interface UserDBProviderProps {
  children: React.ReactNode;
}

export const userDBContext = createContext({} as { userData: ProjectsData[] });

const UserDBProvider: React.FC<UserDBProviderProps> = ({ children }) => {
  const userData = GetUserData();

  return (
    <userDBContext.Provider value={{ userData }}>
      {children}
    </userDBContext.Provider>
  );
};

export default UserDBProvider;
