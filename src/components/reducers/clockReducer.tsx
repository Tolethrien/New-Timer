import { vibrate } from "../utils/vibrate";

export interface ReducerState {
  startDate: number;
  pauseDate: number;
  isRunning: boolean;
  taskInProgress: { project: string; task: string } | undefined;
}

export type dispatchActionTypes = {
  type: "setClock" | "pause" | "play" | "stop" | "complete";
  payload?: {};
};
export const clockProviderReducer = (
  state: ReducerState,
  action: dispatchActionTypes
) => {
  switch (action.type) {
    case "setClock": {
      vibrate("short");
      return {
        ...state,
        pauseDate: 0,
        isRunning: false,
        ...action.payload,
      };
    }
    case "pause": {
      vibrate("short");
      return {
        ...state,
        isRunning: false,
        pauseDate: Date.now(),
      };
    }
    case "play": {
      vibrate("short");
      return {
        ...state,
        isRunning: true,
        ...action.payload,
      };
    }
    case "stop": {
      vibrate("short");
      return {
        ...state,
        isRunning: false,
        pauseDate: 0,
        startDate: 0,
        taskInProgress: undefined,
      };
    }

    case "complete": {
      vibrate("short");
      return {
        ...state,
        isRunning: false,
        pauseDate: 0,
        startDate: 0,
        taskInProgress: undefined,
      };
    }
    default:
      return state;
  }
};
