import PageWrap from "../components/styled/pageWrap";
import AllProjects from "../components/projects/projectsComponents/allProjects";
import ProjectOverview from "../components/projects/projectsComponents/projectOverview";
import TaskOverview from "../components/projects/tasksComponents/tasksOverview";
import { Route, Routes } from "react-router-dom";

interface ProjectsProps {}
interface AllRoutes {
  [key: string]: JSX.Element;
}

const Projects: React.FC<ProjectsProps> = (props) => {
  return (
    <PageWrap>
      <Routes>
        <Route path="/" element={<AllProjects />}></Route>
        <Route path="/project/:id" element={<ProjectOverview />}></Route>
        <Route path="/task/:id" element={<TaskOverview />}></Route>
      </Routes>
    </PageWrap>
  );
};
export default Projects;
