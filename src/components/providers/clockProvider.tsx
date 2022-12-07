import { useState, useEffect, createContext, useRef } from "react";
import { updateTime } from "../../API/handleDocs";
interface provider {
  timeLeft: number;
  barProgress: number;
  pauseClock: () => void;
  playClock: () => void;
  stopClock: () => void;
  setClock: (value: number, task: string) => void;
}
interface props {
  children?: React.ReactNode;
}

export const clockContext = createContext<provider>({} as provider);

const Clock: React.FC<props> = (props) => {
  const [barProgress, setBarProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState<string | undefined>(
    undefined
  );
  const [timeLeft, setTimeLeft] = useState(0);
  const minutesToPercent = (1 / 60) * 100;
  let interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    isRunning && createInterval();
    return () => clearInterval(interval.current);
  }, [timeLeft]);

  const createInterval = () => {
    interval.current = setInterval(() => {
      setTimeLeft(timeLeft + 1);
      setBarProgress(barProgress + minutesToPercent);
    }, 1000);
  };
  const pauseClock = () => {
    clearInterval(interval.current);
    setIsRunning(false);
    updateDB();
  };
  const playClock = () => {
    if (isRunning) return;
    createInterval();
    setIsRunning(true);
  };
  const stopClock = () => {
    updateDB();
    clearInterval(interval.current);
    setTimeLeft(0);
    setBarProgress(0);
    setIsRunning(false);
  };
  const setClock = (value: number, task: string) => {
    setTimeLeft(value);
    setTaskInProgress(task);
  };
  const updateDB = () => {
    updateTime(taskInProgress!, timeLeft);
  };
  const onComplete = () => {
    alert("ss");
    stopClock();
  };
  return (
    <clockContext.Provider
      value={{
        timeLeft,
        barProgress,
        pauseClock,
        playClock,
        stopClock,
        setClock,
      }}
    >
      {props.children}
    </clockContext.Provider>
  );
};
export default Clock;
