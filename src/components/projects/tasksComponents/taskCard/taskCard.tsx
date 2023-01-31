import styled from "styled-components";
import { TasksData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { Clock, GoTo } from "../../../utils/icons";
import { conevrtTimeToString } from "../../../utils/timeConverters";
import { useContext } from "react";
import DisplayIcon from "../../../custom/displayIcon";
import useTheme from "../../../hooks/useTheme";
const TaskCard: React.FC<{
  task: TasksData;
}> = ({ task }) => {
  const {
    getColor: { itemCardColor, taskTemplateColor },
  } = useTheme();
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
      bodyColor={itemCardColor}
    >
      <TopBar>
        <InfoBox bodyColor={taskTemplateColor}>
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>
            {conevrtTimeToString(task!.data.timeSpend)}
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

const ComponentBody = styled.div<{ bodyColor: string }>`
  background-color: ${({ bodyColor }) => bodyColor};

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
const InfoBox = styled.div<{ bodyColor: string }>`
  display: flex;
  align-items: center;
  background-color: ${({ bodyColor }) => bodyColor};

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
