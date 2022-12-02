import styled from "styled-components";
import { RouteData, RoutesChange } from "../../../pages/projects";
import FindData from "../../hooks/findData";
import { ProjectsData } from "../../../API/getUserData";

interface ProjectProps {
  changeRoute: (route: RoutesChange) => void;
  renderRoute: RouteData;
}
interface StyleProps {}
const Project: React.FC<ProjectProps> = ({ renderRoute, changeRoute }) => {
  const project = FindData(renderRoute) as ProjectsData;
  return (
    <Wrap>
      Project
      <p>{project?.id}</p>
      <p>{project?.tasks.length}</p>
      {project.tasks.map((e) => (
        <Wra key={e.id}>
          <p>{e.id}</p>
          <p>{e.data.finished ? "true" : "false"}</p>
          <button onClick={() => changeRoute({ taskId: e.id })}>go</button>
        </Wra>
      ))}
      <button onClick={() => changeRoute("back")}>back</button>
      <button onClick={() => ""}>forv</button>
    </Wrap>
  );
};
export default Project;
const Wrap = styled.div<StyleProps>``;
const Wra = styled.div<StyleProps>`
  display: flex;
  gap: 15px;
`;
