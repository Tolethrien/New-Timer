import styled from "styled-components";
import Glass from "../styledComponents/glass";
import DetailIcon from "../../Icons/Detail.svg";
import CircularProgressBar from "../styledComponents/circularProgresBar";
import { useState, useEffect } from "react";
interface CounterProps {}
const Counter: React.FC<CounterProps> = (props) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let loadingTimeout = setTimeout(() => {
      if (progress >= 100) return;
      setProgress(progress + 1);
    }, 100);
  }, [progress]);
  return (
    <Wrap>
      <Glass size={"full"} padding={"10px 0"}>
        <ProjectName>Project Lazarus</ProjectName>
        <TaskName>Generic nr.2</TaskName>
        <ProjectSetting src={DetailIcon} alt={"detail"} />
      </Glass>
      <Glass size={"inline"}>
        <Clock>
          <Circle>
            <CircularProgressBar
              config={{
                size: 170,
                trackWidth: 10,
                trackColor: `#ddd`,
                indicatorWidth: 8,
                indicatorColor: `#709bba`,
                indicatorCap: "round",
                glow: { strength: 10, color: " #f507d5" },
                font: { family: "roboto", size: 2 },
              }}
              progress={progress}
            >
              {progress}
            </CircularProgressBar>
          </Circle>
        </Clock>
        <Buttons>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </Buttons>
      </Glass>
      <Glass size={"inline"}>
        <TimeRaceName>Time Race</TimeRaceName>
        <RaceBoard>{"<to do>"}</RaceBoard>
      </Glass>
    </Wrap>
  );
};
export default Counter;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;
const ProjectName = styled.div`
  font-size: 1.6em;
`;
const TaskName = styled.div`
  font-size: 1em;
`;
const ProjectSetting = styled.img`
  position: absolute;
  right: 5%;
  top: 15%;
  cursor: pointer;
`;
const Clock = styled.div`
  width: 100%;
`;
const Circle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: absolute; */
`;
const Buttons = styled.div``;
const TimeRaceName = styled.div``;
const RaceBoard = styled.div``;
