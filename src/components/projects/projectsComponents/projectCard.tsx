import styled from "styled-components";
import GoTo from "../../../Icons/GoTo.svg";
import Favorites from "../../../Icons/Favorites.svg";
import TaskList from "../../../Icons/TaskList.svg";
import Clock from "../../../Icons/Clock.svg";
import { RoutesChange } from "../../../pages/projects";
import { ProjectsData } from "../../../API/getUserData";

interface ProjectCardProps {
  changeRoute: (route: RoutesChange) => void;
  data: ProjectsData;
}
interface StyleProps {}
const ProjectCard: React.FC<ProjectCardProps> = ({
  changeRoute,
  data: { data, id, tasks },
}) => {
  const taskDone = (tasks: { data: { finished: boolean } }[]) => {
    let done = tasks.filter((e) => e.data.finished === true);
    return done.length > 0 ? done.length : 0;
  };
  const color = data.color;
  const totalTimeOnTask = tasks.reduce(
    (acu, element) => acu + element.data.totalTime,
    0
  );
  const percentOfComplete =
    tasks.length > 0 ? Math.round((taskDone(tasks) / tasks.length) * 100) : 100;
  return (
    <Wrap onClick={() => changeRoute({ projectId: id })} hue={color}>
      <Info>
        <InfoBox hue={color}>
          <InfoBoxImg src={TaskList}></InfoBoxImg>
          <InfoBoxValue>{taskDone(tasks) + "/" + tasks.length}</InfoBoxValue>
        </InfoBox>
        <InfoBox hue={color}>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>
            {totalTimeOnTask > 99
              ? `${totalTimeOnTask} h`
              : `${totalTimeOnTask} hours`}
          </InfoBoxValue>
        </InfoBox>
        <InfoBox hue={color}>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>{data.status ?? "on Hold"}</InfoBoxValue>
        </InfoBox>
      </Info>
      <Name wrapWord={data.name.length > 21 ?? false}>{data.name} </Name>
      <ProgressBar
        value={percentOfComplete}
        max="100"
        hue={color}
      ></ProgressBar>
      <Icon src={GoTo} pos={[7, 1]}></Icon>
      <Icon src={Favorites} pos={[40, 1.5]}></Icon>
    </Wrap>
  );
};
export default ProjectCard;
const Wrap = styled.div<{ hue: number }>`
  width: 98%;
  position: relative;
  color: black;
  background-color: ${({ hue }) => `hsla(${hue}, 27%, 90%, 1)`};
  display: flex;
  border-radius: 10px;
  margin: 7px 0;
  filter: drop-shadow(0px 4px 4px hsla(0, 0%, 0%, 0.25));
  cursor: pointer;
`;
const Info = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number }>`
  display: flex;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  padding: 2px 5px;
  margin: 5px 0;
  color: hsla(0, 0%, 43%, 1);
`;

const InfoBoxImg = styled.img`
  width: 15px;
  margin-right: 5px;
  filter: invert(46%) sepia(9%) saturate(0%) hue-rotate(161deg) brightness(90%)
    contrast(97%);
`;
const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;
const ProgressBar = styled.progress<{ hue: number }>`
  position: absolute;
  bottom: 10%;
  left: 27%;
  width: 68%;
  height: 7px;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: ${({ hue }) => `hsla(${hue}, 30%, 75%, 1)`};

    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: hsla(0, 0%, 31%, 1);
    border-radius: 5px;
  }
`;
const Name = styled.div<{ wrapWord: boolean }>`
  display: flex;
  align-items: ${({ wrapWord }) => (wrapWord ? "flex-start" : "center")};
  margin-top: 2%;
  margin-bottom: 3%;
  width: 60%;
  font-size: 1.6rem;
  font-weight: 700;
`;
const Icon = styled.img<{ pos: [number, number] }>`
  position: absolute;
  top: ${({ pos }) => pos[0]}%;
  right: ${({ pos }) => pos[1]}%;
  height: 20px;
`;
