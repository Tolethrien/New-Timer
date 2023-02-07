import { User } from "firebase/auth";
import { createContext } from "react";
import { useFirebaseAuth } from "../../API/userAuthentication";
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
