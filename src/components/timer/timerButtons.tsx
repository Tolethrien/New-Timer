import { useContext } from "react";
import styled from "styled-components";
import { appContext } from "../providers/appProvider";
import { clockContext } from "../providers/clockProvider";
import { Done, Play, Stop } from "../utils/icons";
import { vibrate } from "../utils/navigatorUtils";
interface TimerButtonsProps {
  showCheckboxComponent?: boolean;
}
const TimerButtons: React.FC<TimerButtonsProps> = ({
  showCheckboxComponent,
}) => {
  const { playPauseClock, stopClock, onComplete, taskInProgress } =
    useContext(clockContext);
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  return (
    <ComponentBody
      showCheckboxComponent={showCheckboxComponent}
      displayMode={displayMode}
    >
      <ButtonWithDescription>
        <Button
          displayMode={displayMode}
          img={Play}
          onClick={() => (playPauseClock(), vibrate("short"))}
        ></Button>
        Play/Pause
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          img={Stop}
          displayMode={displayMode}
          onClick={() => (stopClock(), vibrate("short"))}
        ></Button>
        Stop
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          disabled={taskInProgress === undefined ? true : false}
          img={Done}
          displayMode={displayMode}
          onClick={() => (onComplete(), vibrate("short"))}
        ></Button>
        Complete
      </ButtonWithDescription>
    </ComponentBody>
  );
};
export default TimerButtons;
const ComponentBody = styled.div<{
  showCheckboxComponent?: boolean;
  displayMode: string;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ displayMode }) =>
    `hsla(0, 0%, ${displayMode === "light" ? 100 : 35}%, 0.6)`};
  backdrop-filter: blur(15px);
  color: inherit;
  border-radius: 10px;
  padding: 1rem;
  ${({ showCheckboxComponent }) =>
    showCheckboxComponent
      ? `
      flex-direction: column;
      gap: 0.5rem;`
      : `
      flex-direction: row;
      padding-inline: 2rem;
      gap: 1rem;`};
`;

const ButtonWithDescription = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
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
