import { useContext } from "react";
import { authContext } from "../providers/authProvider";

const useUserAuth = () => {
  const { currentUser } = useContext(authContext);
  return currentUser;
};
export default useUserAuth;
