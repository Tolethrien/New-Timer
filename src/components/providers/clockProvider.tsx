import React, { createContext, useReducer } from "react";
import {
  ReducerState,
  dispatchActionTypes,
  clockProviderReducer,
} from "../reducers/clockReducer";
interface provider {
  getClock: ReducerState;
  dispatch: React.Dispatch<dispatchActionTypes>;
  setClock: ({ project, task, time }: setClockProps) => void;
}
type setClockProps = {
  project: string;
  task: string;
  time: number;
};
interface ClockProviderProps {
  children?: React.ReactNode;
}

export const clockContext = createContext({} as provider);

const ClockProvider: React.FC<ClockProviderProps> = ({ children }) => {
  const [getClock, dispatch] = useReducer(clockProviderReducer, {
    startDate: 0,
    pauseDate: 0,
    isRunning: false,
    taskInProgress: undefined,
  });

  const setClock = ({ project, task, time }: setClockProps) => {
    dispatch({
      type: "setClock",
      payload: {
        startDate: Date.now() - time * 1000 - Date.now(),
        taskInProgress: { project: project, task: task },
      },
    });
  };

  return (
    <clockContext.Provider
      value={{
        getClock,
        dispatch,
        setClock,
      }}
    >
      {children}
    </clockContext.Provider>
  );
};
export default ClockProvider;
