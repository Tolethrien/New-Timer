import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useParams, Outlet } from "react-router-dom";
import FindData from "../../hooks/findData";
import { TasksData } from "../../../API/getUserData";
import Glass from "../../styled/glass";
import Detail from "../../../Icons/Detail.svg";

import UseStore from "../../hooks/useStore";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { clockContext } from "../../providers/clockProvider";
import { appContext } from "../../providers/appProvider";
import { DropMenuButton, DropMenuOption } from "../../custom/dropmenu";
import { deleteTask } from "../../../API/handleDocs";
interface TasksOverviewProps {}
interface StyleProps {}
const TaskOverview: React.FC<TasksOverviewProps> = () => {
  const task = FindData("sds");
  const createdAt = new Date(task?.data.createdAt.seconds * 1000);
  const navigate = useNavigate();
  const { setClock } = useContext(clockContext);
  const { currentWindow } = useContext(appContext);
  const setAndOpenTimer = () => {
    setClock(task?.data.totalTime, task!.id);
    navigate("/timer");
    currentWindow.set(1);
  };
  return (
    <Glass size={"inline"}>
      <p>{task?.id}</p>
      <p>{task?.data.finished ? "true" : "false"}</p>
      <p>{task?.data.totalTime}</p>
      <p>{task?.data.timeLeft}</p>
      <p>{createdAt.toDateString()}</p>
      <DropMenuButton src={Detail} alt="more options">
        <DropMenuOption>Edit</DropMenuOption>
        <DropMenuOption callback={() => deleteTask(task!)}>
          Remove
        </DropMenuOption>
      </DropMenuButton>
      <Desc></Desc>

      <Bucket>
        <input type={"checkbox"}></input>
        <input type={"text"}></input>
      </Bucket>
      <Bucket>
        <input type={"checkbox"}></input>
        <input type={"text"}></input>
      </Bucket>
      <button onClick={() => setAndOpenTimer()}>uruchom</button>
      <button onClick={() => ""}>back</button>
    </Glass>
  );
};
export default TaskOverview;
const Wrap = styled.div<StyleProps>``;
const Butt = styled.div``;
const Desc = styled.textarea`
  resize: none;
  width: 90%;
  height: fit-content;
  background-color: #d0cfcfa4;
`;
const Bucket = styled.div``;
