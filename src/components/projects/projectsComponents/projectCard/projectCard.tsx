import styled from "styled-components";
import { GoTo, Favorites, TaskList, Clock } from "../../../utils/icons";
import { ProjectsData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { ConvertToStringTime } from "../../../hooks/convertToTime";
import { useContext } from "react";
import DisplayIcon from "../../../styled/displayIcon";
import useTheme from "../../../hooks/useTheme";
interface ProjectCardProps {
  data: ProjectsData;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  data: { data, id, tasks },
}) => {
  const {
    getColor: {
      projectCardColorTone,
      projectCardSecondaryColorTone,
      textColorLight,
      projectCardProgressBarColorTone,
      projectCardProgressBarValueColor,
    },
  } = useTheme();
  const navigate = useNavigate();

  const taskDone = (tasks: { data: { status: string } }[]) => {
    let done = tasks.filter((e) => e.data.status === "Done");
    return done.length > 0 ? done.length : 0;
  };

  const totalTimeOnTask = tasks.reduce(
    (acu, element) => acu + element.data.timeSpend,
    0
  );
  const percentOfComplete =
    tasks.length > 0 ? Math.round((taskDone(tasks) / tasks.length) * 100) : 100;

  return (
    <ComponentBody
      onClick={() => navigate(`./project/${id}`)}
      hue={data.color}
      bodyTone={projectCardColorTone}
    >
      <InfoConteiner>
        <InfoBox
          hue={data.color}
          tone={projectCardSecondaryColorTone}
          textColor={textColorLight}
        >
          <DisplayIcon src={TaskList} alt=""></DisplayIcon>
          <InfoBoxValue>{taskDone(tasks) + "/" + tasks.length}</InfoBoxValue>
        </InfoBox>
        <InfoBox
          hue={data.color}
          tone={projectCardSecondaryColorTone}
          textColor={textColorLight}
        >
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>{data.status}</InfoBoxValue>
        </InfoBox>
        <InfoBox
          hue={data.color}
          tone={projectCardSecondaryColorTone}
          textColor={textColorLight}
        >
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>{ConvertToStringTime(totalTimeOnTask)}</InfoBoxValue>
        </InfoBox>
      </InfoConteiner>
      <Name wrapWord={data.name.length > 21}>
        {data.name.length > 35 ? data.name.slice(0, 35) + "..." : data.name}
      </Name>
      <ProgressBar
        value={percentOfComplete}
        max="100"
        hue={data.color}
        tone={projectCardProgressBarColorTone}
        valueBarColor={projectCardProgressBarValueColor}
      ></ProgressBar>
      <DisplayIcon
        src={GoTo}
        alt=""
        size={[1.2, 1.2]}
        absolute={{ x: "top: 0.3rem", y: "right: 1%" }}
      ></DisplayIcon>
      <DisplayIcon
        src={Favorites}
        alt=""
        size={[1.2, 1.2]}
        absolute={{ x: "top: 2rem", y: "right: 1%" }}
      ></DisplayIcon>
    </ComponentBody>
  );
};
export default ProjectCard;
const ComponentBody = styled.div<{ hue: number; bodyTone: string }>`
  display: flex;
  position: relative;
  width: 98%;
  border-radius: 10px;
  background-color: ${({ bodyTone, hue }) =>
    `hsla(${hue}, 27%, ${bodyTone}, 1)`};
  margin: 0.4rem 0;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const InfoConteiner = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number; tone: string; textColor: string }>`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: ${({ tone, hue }) => `hsla(${hue}, 30%, ${tone}, 1)`};
  border-radius: 5px;
  width: fit-content;
  padding: 0rem 0.3rem;
  margin: 0.3rem 0;
  color: ${({ textColor }) => textColor};
`;

const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;
const ProgressBar = styled.progress<{
  hue: number;
  tone: string;
  valueBarColor: string;
}>`
  position: absolute;
  bottom: 0.3rem;
  left: 27%;
  width: 68%;
  height: 0.5rem;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: ${({ hue, tone }) => `hsla(${hue}, 30%, ${tone}, 1)`};
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: ${({ valueBarColor }) => valueBarColor};
    border-radius: 5px;
  }
`;
const Name = styled.div<{ wrapWord: boolean }>`
  display: flex;
  align-items: ${({ wrapWord }) => (wrapWord ? "flex-start" : "center")};
  margin-top: 1%;
  margin-bottom: 3%;
  width: 60%;
  font-size: 1.6rem;
  font-weight: 700;
`;
