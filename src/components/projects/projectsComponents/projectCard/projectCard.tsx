import styled from "styled-components";
import { GoTo, Favorites, TaskList, Clock } from "../../../utils/icons";
import { ProjectsData } from "../../../../API/getUserData";
import { useNavigate } from "react-router-dom";
import { ConvertToStringTime } from "../../../hooks/convertToTime";
interface ProjectCardProps {
  data: ProjectsData;
}
interface StyleProps {}
const ProjectCard: React.FC<ProjectCardProps> = ({
  data: { data, id, tasks },
}) => {
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
    <ComponentBody onClick={() => navigate(`./project/${id}`)} hue={data.color}>
      <InfoConteiner>
        <InfoBox hue={data.color}>
          <InfoBoxImg src={TaskList}></InfoBoxImg>
          <InfoBoxValue>{taskDone(tasks) + "/" + tasks.length}</InfoBoxValue>
        </InfoBox>
        <InfoBox hue={data.color}>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>{data.status}</InfoBoxValue>
        </InfoBox>
        <InfoBox hue={data.color}>
          <InfoBoxImg src={Clock}></InfoBoxImg>
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
      ></ProgressBar>
      <Icon src={GoTo} pos={[0.3, 1]}></Icon>
      <Icon src={Favorites} pos={[2, 1.5]}></Icon>
    </ComponentBody>
  );
};
export default ProjectCard;
const ComponentBody = styled.div<{ hue: number }>`
  display: flex;
  position: relative;
  width: 98%;
  border-radius: 10px;
  background-color: ${({ hue }) => `hsla(${hue}, 27%, 90%, 1)`};
  margin: 0.4rem 0;
  box-shadow: 0px 4px 4px hsla(0, 0%, 0%, 0.25);
  cursor: pointer;
`;
const InfoConteiner = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div<{ hue: number }>`
  display: flex;
  background-color: ${({ hue }) => `hsla(${hue}, 30%, 85%, 100%)`};
  border-radius: 5px;
  width: fit-content;
  padding: 0rem 0.3rem;
  margin: 0.3rem 0;
  color: hsla(0, 0%, 43%, 1);
`;

const InfoBoxImg = styled.img`
  width: 1rem;
  filter: invert(46%) sepia(9%) saturate(0%) hue-rotate(161deg) brightness(90%)
    contrast(97%);
`;
const InfoBoxValue = styled.p`
  font-weight: 500;
  font-size: 1rem;
`;
const ProgressBar = styled.progress<{ hue: number }>`
  position: absolute;
  bottom: 0.3rem;
  left: 27%;
  width: 68%;
  height: 0.5rem;
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
  margin-top: 1%;
  margin-bottom: 3%;
  width: 60%;
  font-size: 1.6rem;
  font-weight: 700;
`;
const Icon = styled.img<{ pos: [number, number] }>`
  position: absolute;
  top: ${({ pos }) => pos[0]}rem;
  right: ${({ pos }) => pos[1]}%;
  height: 1.3rem;
`;
