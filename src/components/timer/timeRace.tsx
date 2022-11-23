import styled from "styled-components";
import Glass from "../styled/glass";
interface TimeRaceProps {}
interface StyleProps {}
const TimeRace: React.FC<TimeRaceProps> = (props) => {
  return (
    <Glass size={"inline"}>
      <TimeRaceName>Time Race</TimeRaceName>
      <RaceBoard>{"<to do>"}</RaceBoard>
    </Glass>
  );
};
export default TimeRace;
const TimeRaceName = styled.div``;
const RaceBoard = styled.div``;
