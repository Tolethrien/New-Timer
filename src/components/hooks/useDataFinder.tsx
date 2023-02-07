import { userDBContext } from "../providers/userDBProvider";
import { useContext } from "react";
import { ProjectsData } from "../../API/getUserData";

//overloads
function useDataFinder(arg: "all"): ProjectsData[] | undefined;
function useDataFinder<InferType>(
  arg: string | undefined
): InferType | undefined;

function useDataFinder<InferType>(id: ("all" | string) | undefined) {
  const { userData } = useContext(userDBContext);
  if (id === "all") {
    return userData as ProjectsData[];
  }
  let findProject = userData.find((e) => e.id === id);
  if (findProject) return findProject as InferType;

  let filteredProject = userData.find((el) =>
    el.tasks.find((e) => e.id === id)
  );
  if (filteredProject)
    return filteredProject.tasks.find((e) => e.id === id) as InferType;

  return undefined;
}
export default useDataFinder;
