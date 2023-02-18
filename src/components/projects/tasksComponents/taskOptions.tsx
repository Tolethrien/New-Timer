import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TasksData } from "../../../API/getUserData";
import { updateTask } from "../../../API/handleDocs";
import TimeField from "./timefield";
import useTheme from "../../hooks/useTheme";
import ButtonAsIcon from "../../custom/buttonAsIcon";
import DisplayText from "../../styled/components/displayText";
import { RoundSwap } from "../../utils/icons";
import { updateStatus } from "../../../API/handleDocs";
import { vibrate } from "../../utils/vibrate";
interface TaskOptionsProps {
  task: TasksData;
}

const TaskOptions: React.FC<TaskOptionsProps> = ({ task }) => {
  const {
    getColor: {
      itemCardColor,
      dynamicShadowColor,
      taskOptionToggleColor,
      taskOptionsForegroundColor,
    },
  } = useTheme();

  const { id } = useParams();

  const updateDisplayCategory = (
    type: "checkboxes" | "description" | "finishedCheckboxes"
  ) => {
    switch (type) {
      case "checkboxes": {
        updateTask(id!, { showCheckboxes: !task.data.showCheckboxes });
        break;
      }
      case "finishedCheckboxes": {
        updateTask(id!, {
          showFinishedCheckboxes: !task.data.showFinishedCheckboxes,
        });
        break;
      }
      case "description": {
        updateTask(id!, { showDescription: !task.data.showDescription });
        break;
      }
      default:
        return;
    }
    vibrate("short");
  };

  return (
    <ComponentBody>
      <Option bodyColor={itemCardColor} shadowColor={dynamicShadowColor}>
        <DisplayText size={1.2} weight={500}>
          Estimated Time
        </DisplayText>
        <TimeField
          extendedStyle={TextData}
          expectedTime={task.data.timeExpected}
        />
      </Option>
      <Option bodyColor={itemCardColor} shadowColor={dynamicShadowColor}>
        <DisplayText size={1.2} weight={500}>
          Task Status
        </DisplayText>
        <CycleStatus>
          {task.data.status}
          <ButtonAsIcon
            src={RoundSwap}
            onClick={() => updateStatus({ document: task, id: id! })}
            size={[1.2, 1.2]}
            margin="0 0 0 0.5rem"
            animation="rotate"
          ></ButtonAsIcon>
        </CycleStatus>
      </Option>
      <Option bodyColor={itemCardColor} shadowColor={dynamicShadowColor}>
        <DisplayText size={1.2} weight={500}>
          Show Checkboxes
        </DisplayText>
        <Toggle
          onClick={() => updateDisplayCategory("checkboxes")}
          active={task.data.showCheckboxes}
          toggleColor={taskOptionToggleColor}
          taskOptionsForegroundColor={taskOptionsForegroundColor}
        />
      </Option>
      <Option bodyColor={itemCardColor} shadowColor={dynamicShadowColor}>
        <DisplayText size={1.2} weight={500}>
          Show finieshed checkboxes
        </DisplayText>
        <Toggle
          onClick={() => updateDisplayCategory("finishedCheckboxes")}
          active={task.data.showFinishedCheckboxes}
          toggleColor={taskOptionToggleColor}
          taskOptionsForegroundColor={taskOptionsForegroundColor}
        />
      </Option>
      <Option bodyColor={itemCardColor} shadowColor={dynamicShadowColor}>
        <DisplayText size={1.2} weight={500}>
          Show Description
        </DisplayText>
        <Toggle
          onClick={() => updateDisplayCategory("description")}
          active={task.data.showDescription}
          toggleColor={taskOptionToggleColor}
          taskOptionsForegroundColor={taskOptionsForegroundColor}
        />
      </Option>
    </ComponentBody>
  );
};
export default TaskOptions;
const ComponentBody = styled.div``;

const Option = styled.div<{ bodyColor: string; shadowColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  margin-bottom: 0.1rem;
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(15px);
  border-radius: 5px;
  box-shadow: ${({ shadowColor }) => `0px 4px 4px ${shadowColor}`};
`;
const CycleStatus = styled.div`
  display: flex;
  white-space: nowrap;
`;
const TextData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1% 3%;
  font-size: 1rem;
  max-width: 4rem;
  border-radius: 5px;

  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const Toggle = styled.div<{
  active: boolean;
  toggleColor: string;
  taskOptionsForegroundColor: string;
}>`
  position: relative;
  width: 20%;
  height: 1rem;
  border-radius: 5px;
  background-color: ${({ taskOptionsForegroundColor }) =>
    taskOptionsForegroundColor};
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
  :after {
    content: "";
    position: absolute;
    top: -0.25rem;
    width: 50%;
    height: 1.4rem;
    background-color: ${({ toggleColor }) => toggleColor};
    box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.25);
    border-radius: 5px;
    transition: 0.5s;
    ${({ active }) =>
      active ? `left:5%;` : `left:95%; transform:translate(-100%);`}
  }
`;
