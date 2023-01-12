import styled from "styled-components";
import { TasksData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { Clock, GoTo } from "../../../utils/icons";
import { ConvertToStringTime } from "../../../hooks/convertToTime";
import { ButtonAsIcon } from "../../../styled/buttonAsIcon";
const TaskCard: React.FC<{
  task: TasksData;
}> = ({ task }) => {
  const navigate = useNavigate();
  const color = 100;

  const tascDesc = () => {
    if (task && !task.data.desc) return " No description yet";
    return task.data.desc.length > 45
      ? task.data.desc.slice(0, 45) + "..."
      : task.data.desc;
  };
  return (
    <ComponentBody onClick={() => navigate(`../task/${task.id}`)}>
      <TopBar>
        <InfoBox hue={color}>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>
            {ConvertToStringTime(task!.data.timeSpend)}
          </InfoBoxValue>
        </InfoBox>
        <Name>
          {task.data.name.length > 25
            ? task.data.name.slice(0, 25) + "..."
            : task.data.name}
        </Name>
        <ButtonAsIcon src={GoTo} size={[1.2, 1.2]}></ButtonAsIcon>
      </TopBar>
      <Description>{tascDesc()}</Description>
    </ComponentBody>
  );
};
export default TaskCard;

const ComponentBody = styled.div`
  background-color: hsla(169, 77%, 88%, 1);
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
const InfoBox = styled.div<{ hue: number }>`
  display: flex;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  padding: 0.2rem 0.2rem;
  gap: 0.1rem;
  color: hsla(0, 0%, 43%, 1);
`;

const InfoBoxImg = styled.img`
  width: 0.9rem;
  height: 0.9rem;
  filter: invert(46%) sepia(9%) saturate(0%) hue-rotate(161deg) brightness(90%)
    contrast(97%);
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
