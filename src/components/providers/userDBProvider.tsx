import { User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../API/firebase";
import { GetUserData } from "../../API/getUserData";
import { ProjectsData } from "../../API/getUserData";
interface props {
  children: React.ReactNode;
}

interface provider {
  userData: ProjectsData[];
}
export const userDBContext = createContext<provider>({} as provider);

const UserDBProvider: React.FC<props> = (props) => {
  const userData = GetUserData();
  return (
    <userDBContext.Provider
      value={{
        userData,
      }}
    >
      {props.children}
    </userDBContext.Provider>
  );
};

export default UserDBProvider;
