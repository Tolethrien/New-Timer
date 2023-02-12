import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { updateTask } from "../../API/handleDocs";
import useClock from "../hooks/useClock";
import useTheme from "../hooks/useTheme";
import { Done, Play, Stop } from "../utils/icons";
import { vibrate } from "../utils/vibrate";
interface TimerButtonsProps {
  showCheckboxes: boolean;
}

const ClockButtons: React.FC<TimerButtonsProps> = ({ showCheckboxes }) => {
  const {
    getColor: { itemCardColor, buttonColor, iconColor, dynamicShadowColor },
  } = useTheme();
  const navigate = useNavigate();
  const {
    getClock: { isRunning, pauseDate, startDate, taskInProgress },
    dispatch,
  } = useClock();

  const playPauseClock = useCallback(() => {
    if (isRunning) {
      dispatch({ type: "pause" });
      if (taskInProgress !== undefined) updateDB();
    } else {
      dispatch({
        type: "play",
        payload: { startDate: Date.now() - (pauseDate - startDate) },
      });
    }
    vibrate("short");
  }, [isRunning, taskInProgress]);

  const stopClock = useCallback(() => {
    if (taskInProgress !== undefined) {
      updateDB();
    }
    dispatch({ type: "stop" });
    vibrate("short");
  }, [taskInProgress, isRunning]);

  const updateDB = () => {
    updateTask(taskInProgress?.task!, { timeSpend: setTimeToDB() });
  };
  const setTimeToDB = (): number => {
    if (isRunning) return Math.floor((Date.now() - startDate) / 1000);
    return Math.floor((pauseDate - startDate) / 1000);
  };

  const onComplete = useCallback(() => {
    updateTask(taskInProgress?.task!, {
      timeSpend: setTimeToDB(),
      status: "Done",
    });
    dispatch({ type: "complete" });
    vibrate("short");
    navigate(`/projects/project/${taskInProgress?.project}`);
  }, [taskInProgress, isRunning]);

  return (
    <ComponentBody showCheckboxes={showCheckboxes} bodyColor={itemCardColor}>
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={dynamicShadowColor}
          img={Play}
          onClick={playPauseClock}
        ></Button>
        Play/Pause
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={dynamicShadowColor}
          img={Stop}
          onClick={stopClock}
        ></Button>
        Stop
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={dynamicShadowColor}
          disabled={taskInProgress === undefined ? true : false}
          img={Done}
          onClick={onComplete}
        ></Button>
        Complete
      </ButtonWithDescription>
    </ComponentBody>
  );
};
export default ClockButtons;
const ComponentBody = styled.div<{
  showCheckboxes?: boolean;
  bodyColor: string;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ bodyColor }) => bodyColor};
  backdrop-filter: blur(15px);
  color: inherit;
  border-radius: 10px;
  padding: 1rem;
  ${({ showCheckboxes }) =>
    showCheckboxes
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
const Button = styled.button<{
  img: string;
  bodyColor: string;
  iconColor: string;
  shadowColor: string;
}>`
  position: relative;
  background: ${({ disabled }) =>
    disabled ? `hsla(0, 4%, 85%, 0.2)` : `hsla(0, 4%, 85%, 0.1)`};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid hsla(0, 4%, 85%, 0.1);
  cursor: ${({ disabled }) => !disabled && "pointer"};
  box-shadow: ${({ disabled, shadowColor }) =>
    !disabled
      ? `1px 1px 3px 1px ${shadowColor}`
      : ` inset 1px 1px 3px 1px hsla(0, 0%, 0%, 0.25)`};
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
    filter: ${({ disabled, iconColor }) =>
      iconColor + ` opacity(${disabled ? 0.1 : 1})`};
  }
`;
