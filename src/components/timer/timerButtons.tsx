import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../providers/appProvider";
import { clockContext } from "../providers/clockProvider";
import { Done, Pause, Play, Stop } from "../utils/icons";
import { vibrate } from "../utils/navigatorUtils";
interface TimerButtonsProps {}
const TimerButtons: React.FC<TimerButtonsProps> = (props) => {
  const { playPauseClock, stopClock, onComplete, taskInProgress } =
    useContext(clockContext);
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return (
    <ComponentBody>
      <Button
        displayMode={displayMode}
        img={Play}
        onClick={() => (playPauseClock(), vibrate("short"))}
      ></Button>
      Play/Pause
      <Button
        img={Stop}
        displayMode={displayMode}
        onClick={() => (stopClock(), vibrate("short"))}
      ></Button>
      Stop
      <Button
        disabled={taskInProgress === undefined ? true : false}
        img={Done}
        displayMode={displayMode}
        onClick={() => (onComplete(), vibrate("short"))}
      ></Button>
      Complete
    </ComponentBody>
  );
};
export default TimerButtons;
const ComponentBody = styled.div<{}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: hsla(0, 0%, 87%, 0.22);
  backdrop-filter: blur(15px);
  gap: 0.5rem;
  color: inherit;
  border-radius: 10px;
  padding: 0.5rem;
`;

const Button = styled.button<{ img: string; displayMode: string }>`
  position: relative;
  background: ${({ disabled }) =>
    disabled ? `hsla(0, 4%, 85%, 0.2)` : `hsla(0, 4%, 85%, 0.1)`};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid hsla(0, 4%, 85%, 0.1);
  box-shadow: 1px 3px 5px 3px hsla(0, 0%, 0%, 0.25);
  ::before {
    content: "";
    background: ${({ img }) => `url(${img})`};
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    ${({ disabled, displayMode }) =>
      displayMode === "light"
        ? disabled
          ? `filter: brightness(0) invert(0) opacity(0.1);`
          : `filter: brightness(0) invert(0.3);`
        : disabled
        ? `filter: brightness(0) invert(0) opacity(0.1);`
        : `filter: brightness(0) invert(0.7);`}
  }
`;
