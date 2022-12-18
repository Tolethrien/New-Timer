import styled from "styled-components";
import GoTo from "../../../Icons/GoTo.svg";
import Favorites from "../../../Icons/Favorites.svg";
import TaskList from "../../../Icons/TaskList.svg";
import Clock from "../../../Icons/Clock.svg";
interface ProjectCardProps {}
interface StyleProps {}
const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  return (
    <Wrap>
      <Info>
        <InfoBox>
          <InfoBoxImg src={TaskList}></InfoBoxImg>
          <InfoBoxValue>4/15</InfoBoxValue>
        </InfoBox>
        <InfoBox>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>40 hours</InfoBoxValue>
        </InfoBox>
        <InfoBox>
          <InfoBoxImg src={Clock}></InfoBoxImg>
          <InfoBoxValue>On Hold</InfoBoxValue>
        </InfoBox>
      </Info>
      <Name>Procect Obsrymus suka sol del </Name>
      <ProgressBar value="30" max="100"></ProgressBar>
      <Icon src={GoTo} pos={[7, 1]}></Icon>
      <Icon src={Favorites} pos={[40, 1.5]}></Icon>
    </Wrap>
  );
};
export default ProjectCard;
const Wrap = styled.div`
  width: 100%;
  position: relative;
  color: black;
  background-color: hsla(41, 77%, 88%, 1);
  display: flex;
  border-radius: 10px;
  margin: 7px 0;
  filter: drop-shadow(0px 4px 4px hsla(0, 0%, 0%, 0.25));
`;
const Info = styled.div`
  width: 25%;
  margin-left: 2%;
`;
const InfoBox = styled.div`
  display: flex;
  background-color: hsla(41, 30%, 85%, 1);
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
`;
const ProgressBar = styled.progress`
  position: absolute;
  bottom: 10%;
  left: 27%;
  width: 68%;
  height: 7px;
  -webkit-appearance: none;
  ::-webkit-progress-bar {
    background-color: hsla(41, 30%, 75%, 1);
    border-radius: 5px;
  }
  ::-webkit-progress-value {
    background-color: hsla(0, 0%, 31%, 1);
    border-radius: 5px;
  }
`;
const Name = styled.p`
  margin-top: 2%;
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
