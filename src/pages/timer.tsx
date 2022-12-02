import styled from "styled-components";
import Clock from "../components/timer/clock";
import ProjectDesc from "../components/timer/projectDesc";
import TimeRace from "../components/timer/timeRace";
import PageWrap from "../components/styled/pageWrap";

interface TimerProps {}
interface StyleProps {}
const Timer: React.FC<TimerProps> = (props) => {
  return (
    <PageWrap>
      <ProjectDesc></ProjectDesc>
      <Clock></Clock>
      <TimeRace></TimeRace>
    </PageWrap>
  );
};
export default Timer;
