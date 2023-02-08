import styled from "styled-components";
import useDataFinder from "../../hooks/useDataFinder";
import { TasksData } from "../../../API/getUserData";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { clockContext } from "../../providers/clockProvider";
import { Clock } from "../../utils/icons";
import Category from "../../custom/category";
import TaskDescriptionBox from "./taskDescriptionBox";
import { conevrtTimeToString } from "../../utils/timeConverters";
import TitleHeading from "../custom/titleHeading";
import DisplayText from "../../styled/components/displayText";
import ButtonWithIcon from "../../custom/buttonWithIcon";
import Head from "../../custom/head";
import Checkboxes from "./checkboxes";
import TaskOptions from "./taskOptions";
import useTheme from "../../hooks/useTheme";
const TaskOverview: React.FC = () => {
  const { id } = useParams();
  const task = useDataFinder<TasksData>(id);
  const { setClock } = useContext(clockContext);
  const navigate = useNavigate();
  const {
    getColor: { categoryActive, categoryDone, categoryOnHold },
  } = useTheme();
  const playTask = () => {
    setClock({
      time: task!.data.timeSpend,
      project: task!.data.projectID,
      task: id!,
    });
    navigate(`/timer`);
  };

  if (!task) return <Navigate to="/projects" replace />;
  return (
    <>
      <Head>
        <TitleHeading />
        <DisplayText size={1}>
          {conevrtTimeToString(task.data.timeSpend)} spend on task so far
        </DisplayText>
        <DisplayText size={1} margin="0 0 0.5rem 0">
          expected {conevrtTimeToString(task.data.timeExpected)}
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
          <Category name="Description" overrideColor={categoryActive}>
            <TaskDescriptionBox value={task.data.desc}></TaskDescriptionBox>
          </Category>
        )}
        {task.data.showCheckboxes && (
          <Category name="Checkbox" overrideColor={categoryDone}>
            <Checkboxes checkboxes={task.data.checkboxes} />
          </Category>
        )}
        <Category name="Settings" overrideColor={categoryOnHold}>
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
