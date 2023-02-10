import styled from "styled-components";
import ClockButtons from "./clockButtons";
import ClockFace from "./clockFace";
const TimerClock: React.FC = () => {
  return (
    <ComponentBody>
      <ClockFace />
      <ClockButtons />
    </ComponentBody>
  );
};
export default TimerClock;
const ComponentBody = styled.div<{}>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
