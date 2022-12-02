import { appContext } from "../providers/appProvider";
import { useContext } from "react";
import { RouteData } from "../../pages/projects";
import { ProjectsData, TasksData } from "../../API/getUserData";
const FindData = (
  renderRoute: RouteData
): ProjectsData | TasksData | undefined => {
  const { userData } = useContext(appContext);
  if (!userData || !renderRoute) return undefined;

  if (renderRoute.currentRoute === "taskOverview") {
    let project = userData.find((e) => e.id === renderRoute.projectId)?.tasks;
    return project?.find((e) => e.id === renderRoute.taskId);
  }
  if (renderRoute.currentRoute === "projectOverview")
    return userData.find((e) => e.id === renderRoute.projectId);
};
export default FindData;
