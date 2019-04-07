import * as React from "react";
import { HourType, AmPm, TimeEvent } from "../../lib";

export type State = {
  hours: number;
  minutes: number;
  seconds: number;
  hourType: HourType;
  amPm: AmPm;
};

const DEFAULT_STATE = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  hourType: HourType.twentyFour,
  amPm: AmPm.na
};

export const setHours = (payload: number) => ({
  type: "setHours" as "setHours",
  payload
});

export const setMinutes = (payload: number) => ({
  type: "setMinutes" as "setMinutes",
  payload
});

export const setSeconds = (payload: number) => ({
  type: "setSeconds" as "setSeconds",
  payload
});

export const setHourType = (hourType: HourType, currentTime: TimeEvent) => ({
  type: "setHourType" as "setHourType",
  payload: {
    hourType,
    currentTime
  }
});

export const setAmPm = (payload: AmPm) => ({
  type: "setAmPm" as "setAmPm",
  payload
});

export const init = (payload: State) => ({
  type: "init" as "init",
  payload
});

type Action =
  | ReturnType<typeof init>
  | ReturnType<typeof setAmPm>
  | ReturnType<typeof setHours>
  | ReturnType<typeof setHourType>
  | ReturnType<typeof setMinutes>
  | ReturnType<typeof setSeconds>;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "init":
      return { ...state, ...action.payload };
    case "setHours":
      return { ...state, hours: action.payload };
    case "setMinutes":
      return { ...state, minutes: action.payload };
    case "setSeconds":
      return { ...state, seconds: action.payload };
    case "setHourType":
      return {
        ...state,
        hourType: action.payload.hourType,
        hours: action.payload.currentTime.hours,
        amPm: action.payload.currentTime.amPm
      };
    case "setAmPm":
      return { ...state, amPm: action.payload };
    default:
      return state;
  }
};

const { createContext, useReducer } = React;

type StateWithDispatch = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

export const TimeContext = createContext<StateWithDispatch>(undefined as any);

export const TimeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE);
  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  );
};
