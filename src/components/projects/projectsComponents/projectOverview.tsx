import styled from "styled-components";
import { RouteData, RoutesChange } from "../../../pages/projects";
import FindData from "../../hooks/findData";
import { ProjectsData } from "../../../API/getUserData";
import Glass from "../../styled/glass";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { deleteProject, addTask } from "../../../API/handleDocs";
interface ProjectProps {
  changeRoute: (route: RoutesChange) => void;
  renderRoute: RouteData;
}
interface StyleProps {}
const Project: React.FC<ProjectProps> = ({ renderRoute, changeRoute }) => {
  const project = FindData(renderRoute) as ProjectsData;
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

  return (
    <Glass size="inline">
      {!project ? (
        <p>loading...</p>
      ) : (
        <>
          <Name>{project.id}</Name>
          <TimeTotal>{totalTimeOnTasks()} min.</TimeTotal>
          <CompleteData>
            <p>
              zadania: {taskDone(project.tasks) + "/" + project.tasks.length}
            </p>
          </CompleteData>
          <DropMenuButton name={"..."} config={{}}>
            <DropMenuOption callback={() => addTask(project.id, "testowewe")}>
              Add
            </DropMenuOption>
            <DropMenuOption>Edit</DropMenuOption>
            <DropMenuOption
              callback={() => (deleteProject(project), changeRoute("back"))}
            >
              Remove
            </DropMenuOption>
          </DropMenuButton>
          <AllTasks>
            {project.tasks.map((e) => (
              <TaskData
                key={e.id}
                onClick={() => changeRoute({ taskId: e.id })}
              >
                <TaskName>{e.id}</TaskName>
                <TimeOnTask>{e.data.totalTime} min</TimeOnTask>
                <TaskFinished>
                  {e.data.finished ? "true" : "false"}
                </TaskFinished>
              </TaskData>
            ))}
          </AllTasks>
          <button onClick={() => changeRoute("back")}>back</button>
        </>
      )}
    </Glass>
  );
};
export default Project;
const Name = styled.div``;
const TimeTotal = styled.div``;
const CompleteData = styled.div``;
const Wra = styled.div``;
const AllTasks = styled.div`
  width: 95%;
  outline: 2px solid white;
  border-radius: 10px;
  justify-content: space-evenly;
  margin: 10px 0;
`;
const TaskData = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 10px 0;
  cursor: pointer;
`;
const TaskName = styled.div``;
const TimeOnTask = styled.div``;
const TaskFinished = styled.div``;
const TaskGoTo = styled.div``;
