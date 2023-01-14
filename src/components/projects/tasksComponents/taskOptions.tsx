import { useContext } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TasksData } from "../../../API/getUserData";
import { updateTask } from "../../../API/handleDocs";
import TimeField from "../../hooks/timefield";
import { appContext } from "../../providers/appProvider";
import ButtonAsIcon from "../../styled/buttonAsIcon";
import DisplayText from "../../styled/displayText";
import { RoundSwap } from "../../utils/icons";
import updateStatus from "../utils/updateStatus";
interface TaskOptionsProps {
  task: TasksData;
}
const TaskOptions: React.FC<TaskOptionsProps> = ({ task }) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  const { id } = useParams();

  return (
    <ComponentBody>
      {/* {Estimated Time} */}
      <Option displayMode={displayMode}>
        <DisplayText size={1.2} weight={500}>
          Estimated Time
        </DisplayText>
        <TimeField
          extendedStyle={TextData}
          expectedTime={task.data.timeExpected}
        />
      </Option>
      {/* {Task Status} */}
      <Option displayMode={displayMode}>
        <DisplayText size={1.2} weight={500}>
          Task Status
        </DisplayText>
        <CycleStatus>
          {task.data.status}
          <ButtonAsIcon
            src={RoundSwap}
            onClick={() =>
              updateStatus({ document: task, type: "task", id: id! })
            }
            size={[1.2, 1.2]}
            margin="0 0 0 1rem"
          ></ButtonAsIcon>
        </CycleStatus>
      </Option>
      {/* {show Checkboxes} */}
      <Option displayMode={displayMode}>
        <DisplayText size={1.2} weight={500}>
          Show Checkboxes
        </DisplayText>
        <Toggle
          onClick={() =>
            updateTask(id!, {
              showCheckboxes: task.data.showCheckboxes ? false : true,
            })
          }
          active={task.data.showCheckboxes}
          displayMode={displayMode}
        ></Toggle>
      </Option>
      {/* {show Desc} */}
      <Option displayMode={displayMode}>
        <DisplayText size={1.2} weight={500}>
          Show Description
        </DisplayText>
        <Toggle
          onClick={() =>
            updateTask(id!, {
              showDescription: task.data.showDescription ? false : true,
            })
          }
          active={task.data.showDescription}
          displayMode={displayMode}
        ></Toggle>
      </Option>
    </ComponentBody>
  );
};
export default TaskOptions;
const ComponentBody = styled.div``;
const Option = styled.div<{ displayMode: string }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1rem;
  margin-bottom: 0.1rem;
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  backdrop-filter: blur(20px);
  border-radius: 5px;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
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
  background-color: hsla(0, 0%, 85%, 0.4);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const Toggle = styled.div<{ active: boolean; displayMode: string }>`
  position: relative;
  width: 20%;
  height: 1rem;
  border-radius: 5px;
  background-color: hsla(0, 0%, 85%, 0.4);
  box-shadow: inset 1px 1px 1px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
  :after {
    content: "";
    position: absolute;
    top: -0.25rem;
    width: 50%;
    height: 1.4rem;
    background-color: ${({ displayMode }) =>
      `hsla(0, 5%, ${displayMode === "light" ? 40 : 88}%, 1)`};
    box-shadow: 0px 2px 4px hsla(0, 0%, 0%, 0.25);
    border-radius: 5px;
    transition: 0.5s;
    ${({ active }) =>
      active ? `left:5%;` : `left:95%; transform:translate(-100%);`}
  }
`;
