import styled from "styled-components";
import Glass from "../styled/glass";
import DetailIcon from "../../Icons/Detail.svg";
interface ProjectDescProps {}
interface StyleProps {}
const ProjectDesc: React.FC<ProjectDescProps> = (props) => {
  return (
    <Glass size={"full"} padding={"10px 0"} margin={"15px 0"}>
      <ProjectName>Project Lazarus</ProjectName>
      <TaskName>Generic nr.2</TaskName>
      <ProjectSetting src={DetailIcon} alt={"detail"} />
    </Glass>
  );
};
export default ProjectDesc;
const ProjectName = styled.div`
  font-size: 1.6em;
`;
const TaskName = styled.div`
  font-size: 1em;
`;
const ProjectSetting = styled.img`
  position: absolute;
  right: 5%;
  top: 15%;
  cursor: pointer;
`;
