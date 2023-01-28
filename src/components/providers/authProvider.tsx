import { createContext } from "react";
import styled from "styled-components";
interface AuthProviderProps {
  children: React.ReactNode;
}
interface provider {}
export const appContext = createContext({} as provider);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <appContext.Provider value={{}}>{children}</appContext.Provider>;
};
export default AuthProvider;
const ComponentBody = styled.div<{}>``;
