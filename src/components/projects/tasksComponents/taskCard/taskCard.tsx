import styled from "styled-components";
import { TasksData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { Clock, GoTo } from "../../../utils/icons";
import { convertTimeToString } from "../../../utils/timeConverters";
import DisplayIcon from "../../../custom/displayIcon";
import useTheme from "../../../hooks/useTheme";
import DisplayText from "../../../styled/components/displayText";
const TaskCard: React.FC<{
  task: TasksData;
}> = ({ task }) => {
  const {
    getColor: { itemCardColor, taskTemplateColor },
  } = useTheme();
  const navigate = useNavigate();

  return (
    <ComponentBody
      onClick={() => navigate(`../task/${task.id}`)}
      bodyColor={itemCardColor}
      noDesc={!task.data.showDescription}
    >
      <TopBar>
        <InfoBox bodyColor={taskTemplateColor}>
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>
            {convertTimeToString(task!.data.timeSpend)}
          </InfoBoxValue>
        </InfoBox>
        <DisplayText as={Name} size={1.3} weight={600}>
          {task.data.name}
        </DisplayText>
        <DisplayIcon
          absolute={{ x: "right:1%", y: "top:5%" }}
          src={GoTo}
          alt=""
        ></DisplayIcon>
      </TopBar>
      {task.data.showDescription && (
        <DescBox>
          <DisplayText as={Description} weight={500}>
            {task.data.desc}
          </DisplayText>
        </DescBox>
      )}
    </ComponentBody>
  );
};
export default TaskCard;

const ComponentBody = styled.div<{ bodyColor: string; noDesc: boolean }>`
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(20px);
  width: 100%;
  height: fit-content;
  margin-bottom: 0.1rem;
  border-radius: 5px;
  padding-block: ${({ noDesc }) => (noDesc ? "2.5%" : "1%")};
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
  padding-inline: 2%;
`;
const DescBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-left: 1%;
  min-height: 1rem;
`;
const Description = styled.p`
  width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
