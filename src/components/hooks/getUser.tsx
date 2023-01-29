import { useContext } from "react";
import { authContext } from "../providers/authProvider";

const useGetUser = () => {
  const { currentUser } = useContext(authContext);
  return currentUser;
};
export default useGetUser;
