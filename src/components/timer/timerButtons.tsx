import { useContext } from "react";
import styled from "styled-components";
import useTheme from "../hooks/useTheme";
import { clockContext } from "../providers/clockProvider";
import { Done, Play, Stop } from "../utils/icons";
import { vibrate } from "../utils/vibrate";
interface TimerButtonsProps {
  showCheckboxComponent?: boolean;
}
const TimerButtons: React.FC<TimerButtonsProps> = ({
  showCheckboxComponent,
}) => {
  const { playPauseClock, stopClock, onComplete, taskInProgress } =
    useContext(clockContext);
  const {
    getColor: { itemCardColor, buttonColor, iconColor, shadowColor },
  } = useTheme();
  return (
    <ComponentBody
      showCheckboxComponent={showCheckboxComponent}
      bodyColor={itemCardColor}
    >
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={shadowColor}
          img={Play}
          onClick={() => (playPauseClock(), vibrate("short"))}
        ></Button>
        Play/Pause
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={shadowColor}
          img={Stop}
          onClick={() => (stopClock(), vibrate("short"))}
        ></Button>
        Stop
      </ButtonWithDescription>
      <ButtonWithDescription>
        <Button
          bodyColor={buttonColor}
          iconColor={iconColor}
          shadowColor={shadowColor}
          disabled={taskInProgress === undefined ? true : false}
          img={Done}
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
  bodyColor: string;
}>`
  display: flex;
  align-items: center;
  background-color: ${({ bodyColor }) => bodyColor};
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
  box-shadow: ${({ disabled, shadowColor }) =>
    !disabled
      ? `1px 1px 3px 1px ${shadowColor}`
      : ` inset 1px 1px 3px 1px ${shadowColor}`};
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
