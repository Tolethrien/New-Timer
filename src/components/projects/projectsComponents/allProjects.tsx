import styled from "styled-components";
import Glass from "../../styled/glass";
import { useContext } from "react";
import { appContext } from "../../providers/appProvider";
import { RoutesChange } from "../../../pages/projects";
import { addProject } from "../../../API/handleDocs";
interface ProjectsOverallProps {
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
      <Head>
        <p>wszystkie projekty</p>
        <button onClick={() => addProject("testowa")}>add new</button>
      </Head>
      {userData.map((e) => (
        <ProjectBanner key={e.id}>
          <ProjectColor color={e.data.color} />
          <ProjectData onClick={() => changeRoute({ projectId: e.id })}>
            <Name>{e.id}</Name>
            <NumberOfTasks>
              zadania: {taskDone(e.tasks) + "/" + e.tasks.length}
            </NumberOfTasks>
          </ProjectData>
          {/* <PercentOfComplete>50%</PercentOfComplete> */}
          <GoToButton onClick={() => console.log("o niee")}>bro</GoToButton>
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
const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ProjectColor = styled.div<{ color: string }>`
  flex: 1;
  height: 100%;
  background-color: ${({ color }) => color};
`;
const ProjectData = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
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
  width: 20px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
`;
