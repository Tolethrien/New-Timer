import styled from "styled-components";
import FindData from "../../hooks/findData";
import { TasksData } from "../../../API/getUserData";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { clockContext } from "../../providers/clockProvider";
import { Clock } from "../../utils/icons";
import Category from "../custome/category";
import TaskDescriptionBox from "./taskDescriptionBox";
import { ConvertToStringTime } from "../../hooks/convertToTime";
import LoadingData from "../../custom/loadingData";
import TitleHeading from "../custome/titleHeading";
import DisplayText from "../../styled/displayText";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import Head from "../../styled/head";
import Checkboxes from "./checkboxes";
import TaskOptions from "./taskOptions";
const TaskOverview: React.FC = () => {
  const { id } = useParams();
  const task = FindData(id) as TasksData;
  const { setClock } = useContext(clockContext);
  const navigate = useNavigate();

  const playTask = () => {
    setClock({
      time: task.data.timeSpend,
      project: task.data.projectID,
      task: id!,
    });
    navigate("/timer");
  };
  if (!task) return <LoadingData />;

  return (
    <>
      <Head>
        <TitleHeading type={"task"} document={task}></TitleHeading>
        <DisplayText size={1}>
          {ConvertToStringTime(task.data.timeSpend)} spend on task so far
        </DisplayText>
        <DisplayText size={1}>
          expected {ConvertToStringTime(task.data.timeExpected)}
        </DisplayText>
        <ButtonWithIcon
          src={Clock}
          alt=""
          text="Start"
          onClick={playTask}
          extendedStyle={ButtonAbsolute}
        ></ButtonWithIcon>
      </Head>

      <AllCategories>
        {task.data.showDescription && (
          <Category name="Description">
            <TaskDescriptionBox value={task.data.desc}></TaskDescriptionBox>
          </Category>
        )}
        {task.data.showCheckboxes && (
          <Category name="Checkbox">
            <Checkboxes checkboxes={task.data.checkboxes} />
          </Category>
        )}
        <Category name="Settings">
          <TaskOptions task={task} />
        </Category>
      </AllCategories>
    </>
  );
};
export default TaskOverview;

const ButtonAbsolute = styled.button`
  position: absolute;
  right: 10%;
  bottom: 10%;
`;

const AllCategories = styled.div`
  width: 100%;
  padding-top: 5%;
  overflow-y: auto;
  overflow-x: hidden;
`;
