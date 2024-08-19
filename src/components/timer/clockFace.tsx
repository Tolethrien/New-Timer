import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { convertTimeToString } from "../utils/timeConverters";
import CircularProgressBar from "./circularProgresBar";
import useTheme from "../hooks/useTheme";
import useClock from "../hooks/useClock";

const MINUTES_TO_PERCENT = (1 / 60) * 100;

const ClockFace: React.FC = () => {
  const {
    getColor: {
      clockBackgroundColor,
      clockGlowColor,
      clockPrimaryColor,
      clockSecondaryColor,
    },
  } = useTheme();

  const clockInterval = useRef<number>();
  const {
    getClock: { pauseDate, startDate, isRunning },
  } = useClock();
  const [progressBar, setProgressBar] = useState(0);

  const [timeLeft, setTimeLeft] = useState<number>(
    (pauseDate - startDate) / 1000
  );

  useEffect(() => {
    //interval clock based on date. Ppdated every .5s
    // to better handle with async delay
    // (every few minutes one sec was skipped)
    if (isRunning) {
      clockInterval.current = setInterval(() => {
        const now = Math.round((Date.now() - startDate) / 1000);
        if (timeLeft !== now) {
          setTimeLeft(now);
          setProgressBar((prev) => prev + MINUTES_TO_PERCENT);
        }
      }, 250);
    }
    return () => clearInterval(clockInterval.current);
  }, [timeLeft, isRunning]);

  useEffect(() => {
    //reset timer when clock is stopped
    if (startDate === 0) {
      setTimeLeft(0);
      setProgressBar(0);
    }
  }, [startDate]);

  return (
    <ComponentBody>
      <CircularProgressBar
        config={{
          size: "13rem",
          trackWidth: "1rem",
          trackColor: clockPrimaryColor,
          indicatorWidth: "0.8rem",
          indicatorColor: clockSecondaryColor,
          indicatorCap: "round",
          glow: {
            strength: 10,
            color: clockGlowColor,
          },
          text: {
            family: "roboto",
            size: 2.6,
            background: true,
            backgroundColor: clockBackgroundColor,
            paddingBlock: 1,
          },
        }}
        progress={progressBar}
      >
        {convertTimeToString(Math.floor(timeLeft))}
      </CircularProgressBar>
    </ComponentBody>
  );
};
export default ClockFace;
const ComponentBody = styled.div`
  margin-block: 1rem;
`;
