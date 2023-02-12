import styled from "styled-components";
import ClockButtons from "./clockButtons";
import ClockFace from "./clockFace";
interface TimerClockProps {
  showCheckboxes: boolean;
}
const TimerClock: React.FC<TimerClockProps> = ({ showCheckboxes }) => {
  return (
    <ComponentBody showCheckboxes={showCheckboxes}>
      <ClockFace />
      <ClockButtons showCheckboxes={showCheckboxes} />
    </ComponentBody>
  );
};
export default TimerClock;
const ComponentBody = styled.div<{ showCheckboxes: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: ${({ showCheckboxes }) =>
    showCheckboxes ? "row" : "column"};
  gap: ${({ showCheckboxes }) => showCheckboxes && "1rem"};
  align-items: center;
  justify-content: center;
`;
