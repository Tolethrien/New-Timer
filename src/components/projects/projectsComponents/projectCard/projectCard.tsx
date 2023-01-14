import styled from "styled-components";
import { GoTo, Favorites, TaskList, Clock } from "../../../utils/icons";
import { ProjectsData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { ConvertToStringTime } from "../../../hooks/convertToTime";
import { useContext } from "react";
import { appContext } from "../../../providers/appProvider";
import DisplayIcon from "../../../styled/displayIcon";
interface ProjectCardProps {
  data: ProjectsData;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  data: { data, id, tasks },
}) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
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
      displayMode={displayMode}
    >
      <InfoConteiner>
        <InfoBox hue={data.color} displayMode={displayMode}>
          <DisplayIcon src={TaskList} alt=""></DisplayIcon>
          <InfoBoxValue>{taskDone(tasks) + "/" + tasks.length}</InfoBoxValue>
        </InfoBox>
        <InfoBox hue={data.color} displayMode={displayMode}>
          <DisplayIcon src={Clock} alt=""></DisplayIcon>
          <InfoBoxValue>{data.status}</InfoBoxValue>
        </InfoBox>
        <InfoBox hue={data.color} displayMode={displayMode}>
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
        displayMode={displayMode}
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
const ComponentBody = styled.div<{ hue: number; displayMode: string }>`
  display: flex;
  position: relative;
  width: 98%;
  border-radius: 10px;
  background-color: ${({ displayMode, hue }) =>
    `hsla(${hue}, 27%, ${displayMode === "light" ? 80 : 20}%, 1)`};
  margin: 0.4rem 0;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const InfoConteiner = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number; displayMode: string }>`
  display: flex;
  align-items: center;
  gap: 0.2rem;
  background-color: ${({ displayMode, hue }) =>
    `hsla(${hue}, 30%, ${displayMode === "light" ? 70 : 30}%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  padding: 0rem 0.3rem;
  margin: 0.3rem 0;
  color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 40 : 65}%, 100%)`};
`;

const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;
const ProgressBar = styled.progress<{ hue: number; displayMode: string }>`
  position: absolute;
  bottom: 0.3rem;
  left: 27%;
  width: 68%;
  height: 0.5rem;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: ${({ hue, displayMode }) =>
      `hsla(${hue}, 30%, ${displayMode === "light" ? 70 : 30}%, 1)`};
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: ${({ displayMode }) =>
      `hsla(0, 0%, ${displayMode === "light" ? 30 : 70}%, 1)`};
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
