import { User } from "firebase/auth";
import { createContext } from "react";
import styled from "styled-components";
import { useAuth } from "../../API/firebase";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface provider {
  currentUser: User | null | undefined;
}
export const authContext = createContext({} as provider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const currentUser = useAuth();

  return (
    <authContext.Provider value={{ currentUser }}>
      {children}
    </authContext.Provider>
  );
};
export default AuthProvider;
const ComponentBody = styled.div<{}>``;
