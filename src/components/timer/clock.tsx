import styled from "styled-components";
import Glass from "../styled/glass";
import CircularProgressBar from "../styled/circularProgresBar";
import Play from "../../Icons/Play.svg";
import Pause from "../../Icons/Pause.svg";
import Stop from "../../Icons/Stop.svg";
import Done from "../../Icons/Done.svg";
import { vibrate } from "../utils/navigatorUtils";
import { useContext } from "react";
import { clockContext } from "../providers/clockProvider";
import { appContext } from "../providers/appProvider";
interface CounterProps {}
const Clock: React.FC<CounterProps> = (props) => {
  const { timeLeft, pauseClock, playClock, barProgress, stopClock } =
    useContext(clockContext);
  const {
    primary: { primaryColor },
  } = useContext(appContext);

  return (
    <Glass size={"inline"} margin={"20% 0"}>
      <ProgressBar>
        <CircularProgressBar
          config={{
            size: 170,
            trackWidth: 10,
            trackColor: `#ddd`,
            indicatorWidth: 8,
            indicatorColor: `#709bba`,
            indicatorCap: "round",
            glow: { strength: 10, color: " #f507d5" },
            font: { family: "roboto", size: 2 },
          }}
          progress={barProgress}
        >
          {timeLeft}
        </CircularProgressBar>
      </ProgressBar>
      <Buttons>
        <Button
          onClick={() => (playClock(), vibrate("short"))}
          color={primaryColor}
        >
          <ButtonSvg src={Play} alt={"s"}></ButtonSvg>
        </Button>
        <Button
          onClick={() => (pauseClock(), vibrate("short"))}
          color={primaryColor}
        >
          <ButtonSvg src={Pause} alt={"s"}></ButtonSvg>
        </Button>
        <Button
          onClick={() => (stopClock(), vibrate("short"))}
          color={primaryColor}
        >
          <ButtonSvg src={Stop} alt={"s"}></ButtonSvg>
        </Button>
        <Button
          onClick={() => (stopClock(), vibrate("short"))}
          color={primaryColor}
        >
          <ButtonSvg src={Done} alt={"s"}></ButtonSvg>
        </Button>
      </Buttons>
    </Glass>
  );
};
export default Clock;

const ProgressBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Buttons = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5% 0;
`;
const Button = styled.button<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
  border: 2px solid #979797;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  width: 3em;
  height: 3em;
`;
const ButtonSvg = styled.img`
  padding: 5px;
`;
