import { userDBContext } from "../providers/userDBProvider";
import { useContext } from "react";
import { ProjectsData, TasksData } from "../../API/getUserData";

//overloads
function useDataFinder(arg: "all"): ProjectsData[] | undefined;
function useDataFinder(
  arg: string | undefined
): ProjectsData | TasksData | undefined;
function useDataFinder<InferType>(
  arg: string | undefined
): InferType | undefined;

function useDataFinder(id: ("all" | string) | undefined) {
  const { userData } = useContext(userDBContext);
  if (id === "all") {
    return userData;
  }
  let findProject = userData.find((e) => e.id === id);
  if (findProject) return findProject;

  let filteredProject = userData.find((el) =>
    el.tasks.find((e) => e.id === id)
  );
  if (filteredProject) return filteredProject.tasks.find((e) => e.id === id);

  return undefined;
}
export default useDataFinder;
