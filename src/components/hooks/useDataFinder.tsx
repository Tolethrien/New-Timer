import { userDBContext } from "../providers/userDBProvider";
import { useContext } from "react";

const useDataFinder = (id: string | undefined) => {
  const { userData } = useContext(userDBContext);
  let findProject = userData.find((e) => e.id === id);
  if (findProject) return findProject;
  let filteredProject = userData.find((el) =>
    el.tasks.find((e) => e.id === id)
  );
  if (filteredProject) return filteredProject.tasks.find((e) => e.id === id);
  console.error("cant find project or task with this ID");
  return undefined;
};
export default useDataFinder;
