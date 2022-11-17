import styled from "styled-components";
import Counter from "../components/timerComponents/counter";
interface TimerProps {}
interface StyleProps {}
const Timer: React.FC<TimerProps> = (props) => {
  return (
    <Wrap>
      <Counter></Counter>
    </Wrap>
  );
};
export default Timer;
const Wrap = styled.div<StyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 45px);
`;
