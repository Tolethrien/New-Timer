import { useState, useEffect, createContext, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { updateTask, updateTime } from "../../API/handleDocs";
interface provider {
  timeLeft: number;
  barProgress: number;
  pauseClock: () => void;
  playClock: () => void;
  stopClock: () => void;
  onComplete: () => void;
  setClock: ({ time, project, task }: SetClock) => void;
  taskInProgress: { project: string; task: string } | undefined;
}
interface SetClock {
  time: number;
  project: string;
  task: string;
}
interface props {
  children?: React.ReactNode;
}

export const clockContext = createContext<provider>({} as provider);

const Clock: React.FC<props> = (props) => {
  const [barProgress, setBarProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState<
    { project: string; task: string } | undefined
  >(undefined);
  const [timeLeft, setTimeLeft] = useState(0);
  const minutesToPercent = (1 / 60) * 100;
  let interval = useRef<NodeJS.Timer>();
  const navigate = useNavigate();
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
  const setClock = ({ time, project, task }: SetClock) => {
    setTimeLeft(time);
    setTaskInProgress({ project, task });
  };
  const updateDB = () => {
    updateTask(taskInProgress?.task!, { timeSpend: timeLeft });
  };

  const onComplete = () => {
    updateTask(taskInProgress?.task!, { timeSpend: timeLeft, status: "Done" });
    setTimeLeft(0);
    setBarProgress(0);
    setIsRunning(false);
    navigate(`/projects/project/${taskInProgress?.project}`);
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
        onComplete,
        taskInProgress,
      }}
    >
      {props.children}
    </clockContext.Provider>
  );
};
export default Clock;
