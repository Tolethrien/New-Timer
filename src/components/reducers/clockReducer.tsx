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
      return {
        ...state,
        pauseDate: 0,
        isRunning: false,
        ...action.payload,
      };
    }
    case "pause": {
      return {
        ...state,
        isRunning: false,
        pauseDate: Date.now(),
      };
    }
    case "play": {
      return {
        ...state,
        isRunning: true,
        ...action.payload,
      };
    }
    case "stop": {
      return {
        ...state,
        isRunning: false,
        pauseDate: 0,
        startDate: 0,
        taskInProgress: undefined,
      };
    }

    case "complete": {
      return {
        ...state,
        isRunning: false,
        taskInProgress: undefined,
      };
    }
    default:
      return state;
  }
};
