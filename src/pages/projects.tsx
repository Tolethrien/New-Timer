import PageWrap from "../components/styled/pageWrap";
import AllProjects from "../components/projects/allProjects";
import ProjectOverview from "../components/projects/projectsComponents/projectOverview";
import TaskOverview from "../components/projects/tasksComponents/tasksOverview";
import { Navigate, Route, Routes } from "react-router-dom";

const Projects: React.FC = (props) => {
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
