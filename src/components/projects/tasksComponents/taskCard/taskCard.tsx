import styled from "styled-components";
import { TasksData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { Clock, GoTo } from "../../../utils/icons";
import { ConvertToStringTime } from "../../../hooks/convertToTime";
import { useContext } from "react";
import { appContext } from "../../../providers/appProvider";
import DisplayIcon from "../../../styled/displayIcon";
const TaskCard: React.FC<{
  task: TasksData;
}> = ({ task }) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  const navigate = useNavigate();

  const tascDesc = () => {
    if (task && !task.data.desc) return " No description yet";
    return task.data.desc.length > 45
      ? task.data.desc.slice(0, 45) + "..."
      : task.data.desc;
  };
  return (
    <ComponentBody
      onClick={() => navigate(`../task/${task.id}`)}
      displayMode={displayMode}
    >
      <TopBar>
        <InfoBox displayMode={displayMode}>
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>
            {ConvertToStringTime(task!.data.timeSpend)}
          </InfoBoxValue>
        </InfoBox>
        <Name>
          {task.data.name.length > 25
            ? task.data.name.slice(0, 25) + "..."
            : task.data.name}
        </Name>
        <DisplayIcon src={GoTo} alt=""></DisplayIcon>
      </TopBar>
      <Description>{tascDesc()}</Description>
    </ComponentBody>
  );
};
export default TaskCard;

const ComponentBody = styled.div<{ displayMode: string }>`
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  backdrop-filter: blur(20px);

  width: 100%;
  height: fit-content;
  margin-bottom: 0.1rem;
  border-radius: 5px;
  padding-block: 1%;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const TopBar = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  padding-inline: 2%;
`;
const InfoBox = styled.div<{ displayMode: string }>`
  display: flex;
  align-items: center;
  background-color: ${({ displayMode }) =>
    displayMode === "light"
      ? `hsla(40, 76%,70%,0.5)`
      : `hsla(260,26%,65%,0.5)`};
  border-radius: 5px;
  width: fit-content;
  padding: 0.2rem 0.2rem;
  gap: 0.1rem;
`;

const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 0.8rem;
`;

const Name = styled.p`
  flex-grow: 1;
  padding-left: 2%;
  font-size: 1.3rem;
  font-weight: 600;
`;

const Description = styled.p`
  width: 80%;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 1%;
`;
