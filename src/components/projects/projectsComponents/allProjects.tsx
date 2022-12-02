import styled from "styled-components";
import Glass from "../../styled/glass";
import { useContext } from "react";
import { appContext } from "../../providers/appProvider";
import { RoutesChange } from "../../../pages/projects";

interface ProjectsOverallProps {
  // changeRoute: React.Dispatch<React.SetStateAction<RouteData>>;
  changeRoute: (route: RoutesChange) => void;
}
interface StyleProps {}

const AllProjects: React.FC<ProjectsOverallProps> = ({ changeRoute }) => {
  const { userData } = useContext(appContext);
  // console.log(userData);
  const taskDone = (tasks: { data: { finished: boolean } }[]) => {
    let done = tasks.filter((e) => e.data.finished === true);
    return done.length > 0 ? done.length : 0;
  };
  return (
    <Glass size={"inline"}>
      wszystkie projekty
      {userData.map((e) => (
        <ProjectBanner key={e.id}>
          <ProjectColor></ProjectColor>
          <ProjectData>
            <Name>{e.id}</Name>
            <NumberOfTasks>
              zadania: {taskDone(e.tasks) + "/" + e.tasks.length}
            </NumberOfTasks>
          </ProjectData>
          <PercentOfComplete>50%</PercentOfComplete>
          <GoToButton onClick={() => changeRoute({ projectId: e.id })}>
            go
          </GoToButton>
        </ProjectBanner>
      ))}
    </Glass>
  );
};
export default AllProjects;
const ProjectBanner = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  background-color: red;
  border-radius: 10px;
  outline: 2px solid #b6b6b6;
  filter: drop-shadow(3px 3px 4px rgba(0, 0, 0, 0.25));
  overflow: hidden;
  margin: 1% 0;
`;
const ProjectColor = styled.div`
  flex: 1;
  height: 100%;
  background-color: black;
`;
const ProjectData = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Name = styled.div`
  align-self: center;
`;
const NumberOfTasks = styled.div`
  padding-left: 5%;
`;
const PercentOfComplete = styled.div`
  flex: 1;
`;
const GoToButton = styled.button`
  flex: 1;
  width: 10px;
  height: 10px;
`;
