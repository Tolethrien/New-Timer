import { useState, useEffect, createContext, useRef } from "react";
import UseStore from "../hooks/useStore";
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
  let timeTotal = 1;
  const [barProgress, setBarProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState("");
  const [timeLeft, setTimeLeft] = useState(45);
  const minutesToPercent = (1 / (timeTotal * 60)) * 100;
  let interval = useRef<NodeJS.Timer>();

  useEffect(() => {
    isRunning && createInterval();
    return () => clearInterval(interval.current);
  }, [timeLeft]);

  const createInterval = () => {
    interval.current = setInterval(() => {
      setTimeLeft(timeLeft + 1);
      setBarProgress(barProgress + minutesToPercent);
      if (taskInProgress.length > 0) updateTime(taskInProgress, timeLeft + 1);
    }, 1000);
  };
  const pauseClock = () => {
    clearInterval(interval.current);
    setIsRunning(false);
  };
  const playClock = () => {
    if (isRunning) return;
    createInterval();
    setIsRunning(true);
  };
  const stopClock = () => {
    clearInterval(interval.current);
    setTimeLeft(timeTotal * 60);
    setBarProgress(0);
    setIsRunning(false);
  };
  const setClock = (value: number, task: string) => {
    setTimeLeft(value);
    setTaskInProgress(task);
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
