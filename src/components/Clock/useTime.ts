import { useCallback, useContext, useEffect } from "react";
import {
  TimeContext,
  setHourType,
  setHours,
  setMinutes,
  setSeconds,
  init,
  State
} from "./context";
import { Time, AmPm, HourType } from "../../lib";
export { AmPm, HourType };

const toCallback = <T extends (payload: any) => any>(
  dispatch: React.Dispatch<any>,
  actionCreator: T
) => (...p: Parameters<T>) => {
  dispatch((actionCreator as any)(...p));
};

export const useTime = (): [State, (h: HourType) => void] => {
  const { state, dispatch } = useContext(TimeContext);
  let time: Time;
  useEffect(() => {
    time = new Time();
    dispatch(
      init({
        amPm: time.getAmPm(),
        hours: time.getHours(),
        hourType: time.getHourType(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
      })
    );
    time.on("hours", toCallback(dispatch, setHours));
    time.on("minutes", toCallback(dispatch, setMinutes));
    time.on("seconds", toCallback(dispatch, setSeconds));
    time.on("hourType", toCallback(dispatch, setHourType as any));
  }, []);

  const setHourTypeOnTime = useCallback(
    (hourType: HourType) => {
      time.setHourType(hourType);
    },
    [time]
  );

  return [state, setHourTypeOnTime];
};
