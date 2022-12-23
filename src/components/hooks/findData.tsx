import { appContext } from "../providers/appProvider";
import { useContext } from "react";
import { ProjectsData, TasksData } from "../../API/getUserData";

const FindData = (id: string | undefined) => {
  const { userData } = useContext(appContext);
  return userData.find((e) => e.id === id);
};
export default FindData;
