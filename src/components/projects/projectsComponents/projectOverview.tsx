import styled from "styled-components";
import { RouteData, RoutesChange } from "../../../pages/projects";
import FindData from "../../hooks/findData";
import { useState, useContext } from "react";
import Add from "../../../Icons/Add.svg";
import Detail from "../../../Icons/Detail.svg";
import Arrow from "../../../Icons/Arrow.svg";
import { ProjectsData } from "../../../API/getUserData";
import Glass from "../../styled/glass";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { deleteProject, addTask } from "../../../API/handleDocs";
interface ProjectProps {
  changeRoute: (route: RoutesChange) => void;
  renderRoute: RouteData;
}
interface StyleProps {}
const Project: React.FC<ProjectProps> = ({ renderRoute, changeRoute }) => {
  const project = FindData(renderRoute) as ProjectsData;
  const [searchText, setSearchText] = useState("");
  const {
    secondary: { secondaryColor },
  } = useContext(appContext);

  const taskDone = (tasks: { data: { finished: boolean } }[]) => {
    let done = tasks.filter((e) => e.data.finished === true);
    return done.length > 0 ? done.length : 0;
  };
  const totalTimeOnTasks = () => {
    return project?.tasks.reduce(
      (acu, element) => acu + element.data.totalTime,
      0
    );
  };
  const filterByName = (value: { data: { name: string } }) => {
    return value.data.name.toLowerCase().includes(searchText.toLowerCase());
  };
  if (!project) return <p>Loading...</p>;
  return (
    <Glass size="inline">
      <Head>
        <BackButton
          src={Arrow}
          alt="go back"
          onClick={() => changeRoute("back")}
        />
        <Name>{project.data.name}</Name>
        <DropMenuButton src={Detail} alt="more options">
          <DropMenuOption>Edit</DropMenuOption>
          <DropMenuOption
            callback={() => (deleteProject(project), changeRoute("back"))}
          >
            Remove
          </DropMenuOption>
        </DropMenuButton>
      </Head>
      <Details>
        <TotalTime>Total Time:{totalTimeOnTasks()} min.</TotalTime>
        <EstimatedTime>szacowany czas</EstimatedTime>
        <TasksDone>
          zadania: {taskDone(project.tasks) + "/" + project.tasks.length}
        </TasksDone>
      </Details>
      <TaskData>
        <TasksHeader>{"head(5)"}</TasksHeader>
        <AddButton
          src={Add}
          alt="add new project"
          onClick={() => addTask(project.id, searchText)}
        />
        <SearchBar onChange={(e) => setSearchText(e.target.value)}></SearchBar>
        <AllTasks>
          {project.tasks.filter(filterByName).map((e) => (
            <TaskWrap
              key={e.id}
              onClick={() => changeRoute({ taskId: e.id })}
              color={secondaryColor}
            >
              <TaskName>{e.data.name}</TaskName>
              <TaskTime>{e.data.totalTime} min</TaskTime>
              <TaskFinished done={e.data.finished}></TaskFinished>
            </TaskWrap>
          ))}
        </AllTasks>
      </TaskData>
    </Glass>
  );
};
export default Project;
const Head = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: space-between;
`;
const BackButton = styled.img`
  rotate: 180deg;
  cursor: pointer;
`;
const Name = styled.p``;
const Details = styled.div`
  width: 90%;
  text-align: center;
`;
const OptionsButton = styled.img``;
const TotalTime = styled.p``;
const EstimatedTime = styled.p``;
const TasksDone = styled.p``;
const TaskData = styled.div`
  width: 90%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const AddButton = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`;
const TasksHeader = styled.p``;
const SearchBar = styled.input`
  width: 50%;
`;
const AllTasks = styled.div`
  width: 80%;
  padding: 10px 0;
`;
const TaskWrap = styled.div<{ color: string }>`
  display: flex;
  background-color: ${({ color }) => color};
  border-radius: 5px;
  padding: 5px;
  margin: 5px 0;
  cursor: pointer;
`;
const TaskName = styled.div`
  flex: 7;
  text-align: center;
`;
const TaskTime = styled.div`
  flex: 2;
`;
const TaskFinished = styled.div<{ done: boolean }>`
  flex: 1;
  position: relative;
  :after {
    content: "";
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ done }) => (done ? "green" : "red")};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
