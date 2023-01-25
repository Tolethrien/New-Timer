import { useContext } from "react";
import styled from "styled-components";
import { ConvertToStringTime } from "../hooks/convertToTime";
import { appContext } from "../providers/appProvider";
import { clockContext } from "../providers/clockProvider";
import CircularProgressBar from "../styled/circularProgresBar";
import TimerButtons from "./timerButtons";
interface ClockProps {
  showCheckboxComponent: boolean;
}
interface ColorsType {
  [key: string]: {
    primary: string;
    secondary: string;
    glow: string;
    backgroundColor: string;
  };
}
const Clock: React.FC<ClockProps> = ({ showCheckboxComponent }) => {
  const {
    displayMode: { displayMode },
  } = useContext(appContext);
  const { barProgress, timeLeft } = useContext(clockContext);
  const clockColors: ColorsType = {
    light: {
      primary: "hsla(32, 86%, 83%, 1)",
      secondary: "hsla(160, 70%, 60%, 1)",
      glow: "hsla(20, 100%, 50%,0.5)",
      backgroundColor: "hsla(32, 86%, 83%, 0.5)",
    },
    dark: {
      primary: "hsla(200, 70%, 60%, 1)",
      secondary: "hsla(320, 70%, 60%, 1)",
      glow: "hsla(108, 100%, 50%,0.5)",
      backgroundColor: "hsla(200, 70%, 60%, 0.5)",
    },
  };

  return (
    <ComponentBody showCheckboxComponent={showCheckboxComponent}>
      <CircularProgressBar
        config={{
          size: "13rem",
          trackWidth: "1rem",
          trackColor: clockColors[displayMode].primary,
          indicatorWidth: "0.8rem",
          indicatorColor: clockColors[displayMode].secondary,
          indicatorCap: "round",
          glow: {
            strength: 10,
            color: clockColors[displayMode].glow,
          },
          text: {
            family: "roboto",
            size: 2.6,
            background: true,
            backgroundColor: clockColors[displayMode].backgroundColor,
            paddingBlock: 1,
          },
        }}
        progress={barProgress}
      >
        {ConvertToStringTime(timeLeft)}
      </CircularProgressBar>
      <TimerButtons showCheckboxComponent={showCheckboxComponent} />
    </ComponentBody>
  );
};
export default Clock;
const ComponentBody = styled.div<{ showCheckboxComponent: boolean }>`
  display: flex;
  flex-direction: ${({ showCheckboxComponent }) =>
    showCheckboxComponent ? "row" : "column"};
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-block: 1rem;
  flex-grow: 1;
`;
