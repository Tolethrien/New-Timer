import styled from "styled-components";
import Clock from "../components/timer/clock";
import ProjectDesc from "../components/timer/projectDesc";
import TimeRace from "../components/timer/timeRace";
interface TimerProps {}
interface StyleProps {}
const Timer: React.FC<TimerProps> = (props) => {
  return (
    <Wrap>
      <ProjectDesc></ProjectDesc>
      <Clock></Clock>
      <TimeRace></TimeRace>
    </Wrap>
  );
};
export default Timer;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: calc(100% - 55px);
`;
