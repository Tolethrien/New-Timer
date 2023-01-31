import { useState, useEffect, createContext, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { updateTask } from "../../API/handleDocs";
interface provider {
  timeLeft: number;
  barProgress: number;
  playPauseClock: () => void;
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
const MINUTES_TO_PERCENT = (1 / 60) * 100;

const ClockProvider: React.FC<props> = (props) => {
  // const [state, dispatch] = useReducer(reducer, { age: 42 });
  const [barProgress, setBarProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [taskInProgress, setTaskInProgress] = useState<
    { project: string; task: string } | undefined
  >(undefined);
  const [timeLeft, setTimeLeft] = useState(0);
  let interval = useRef<NodeJS.Timer>();
  const navigate = useNavigate();
  useEffect(() => {
    if (isRunning) {
      interval.current = setInterval(() => {
        setTimeLeft((prev) => prev + 1);
        setBarProgress((prev) => prev + MINUTES_TO_PERCENT);
      }, 1000);
    }
    return () => clearInterval(interval.current);
  }, [timeLeft, isRunning]);

  const playPauseClock = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      if (taskInProgress !== undefined) updateDB();
    } else {
      setIsRunning(true);
    }
  }, [isRunning, taskInProgress]);
  const stopClock = useCallback(() => {
    setTimeLeft(0);
    setBarProgress(0);
    setIsRunning(false);
    console.log("w undefined");
    if (taskInProgress !== undefined) {
      updateDB();
      setTaskInProgress(undefined);
      navigate("/timer/undefined");
      console.log("w tasku");
    }
  }, [taskInProgress]);
  const setClock = ({ time, project, task }: SetClock) => {
    setTimeLeft(time);
    setTaskInProgress({ project, task });
  };
  const updateDB = () => {
    updateTask(taskInProgress?.task!, { timeSpend: timeLeft });
  };

  const onComplete = useCallback(() => {
    updateTask(taskInProgress?.task!, { timeSpend: timeLeft, status: "Done" });
    setTimeLeft(0);
    setBarProgress(0);
    setIsRunning(false);
    setTaskInProgress(undefined);
    navigate(`/projects/project/${taskInProgress?.project}`);
  }, [taskInProgress, timeLeft]);
  return (
    <clockContext.Provider
      value={{
        timeLeft,
        barProgress,
        playPauseClock,
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
export default ClockProvider;
