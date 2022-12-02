import { useState } from "react";
import PageWrap from "../components/styled/pageWrap";
import AllProjects from "../components/projects/projectsComponents/allProjects";
import ProjectOverview from "../components/projects/projectsComponents/projectOverview";
import TaskOverview from "../components/projects/tasksComponents/tasksOverview";

interface ProjectsProps {}
interface AllRoutes {
  [key: string]: JSX.Element;
}
export type RoutesChange = { projectId: string } | { taskId: string } | "back";

export interface RouteData {
  currentRoute: string;
  prevRoute: string | undefined;
  projectId: string | undefined;
  taskId: string | undefined;
}
const Projects: React.FC<ProjectsProps> = (props) => {
  const [renderRoute, setRenderRoute] = useState<RouteData>({
    currentRoute: "allProjects",
    prevRoute: undefined,
    projectId: undefined,
    taskId: undefined,
  });

  const changeRoute = (route: RoutesChange) => {
    if (route === "back" && renderRoute.currentRoute !== "allProjects") {
      let trace = ["allProjects", "projectOverview", "taskOverview"];
      setRenderRoute({
        ...renderRoute,
        prevRoute: trace[trace.indexOf(renderRoute.currentRoute)],
        currentRoute: trace[trace.indexOf(renderRoute.currentRoute) - 1],
      });
    }
    if (typeof route === "object") {
      let [key, value] = Object.entries(route)[0];
      if (key === "projectId")
        setRenderRoute({
          ...renderRoute,
          prevRoute: renderRoute.currentRoute,
          currentRoute: "projectOverview",
          [key]: value,
        });

      if (key === "taskId")
        setRenderRoute({
          ...renderRoute,
          prevRoute: renderRoute.currentRoute,
          currentRoute: "taskOverview",
          [key]: value,
        });
    }
  };
  const routes: AllRoutes = {
    allProjects: <AllProjects changeRoute={changeRoute} />,
    projectOverview: (
      <ProjectOverview changeRoute={changeRoute} renderRoute={renderRoute} />
    ),
    taskOverview: (
      <TaskOverview changeRoute={changeRoute} renderRoute={renderRoute} />
    ),
  };

  return <PageWrap>{routes[renderRoute.currentRoute]}</PageWrap>;
};
export default Projects;
