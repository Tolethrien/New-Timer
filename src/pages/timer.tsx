import styled from "styled-components";
import Clock from "../components/timer/clock";
import ProjectDesc from "../components/timer/projectDesc";
import TimeRace from "../components/timer/timeRace";
import PageWrap from "../components/styled/pageWrap";
import { useContext } from "react";
import { appContext } from "../components/providers/appProvider";
import { Navigate } from "react-router-dom";

interface TimerProps {}
interface StyleProps {}
const Timer: React.FC<TimerProps> = (props) => {
  const { currentUser } = useContext(appContext);
  if (!currentUser) return <Navigate to="/login" replace />;

  return (
    <PageWrap>
      <ProjectDesc></ProjectDesc>
      <Clock></Clock>
      <TimeRace></TimeRace>
    </PageWrap>
  );
};
export default Timer;
