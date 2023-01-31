import { User } from "firebase/auth";
import { createContext } from "react";
import styled from "styled-components";
import { useFirebaseAuth } from "../../API/userAuth";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface provider {
  currentUser: User | null | undefined;
}
export const authContext = createContext({} as provider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const currentUser = useFirebaseAuth();

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
const ComponentBody = styled.div<{}>``;
