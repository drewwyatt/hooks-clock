import { useCallback, useContext, useEffect } from 'react'
import { Time, AmPm, HourType } from '../../lib'
import { TimeContext } from './context'
import { actions, State } from './state'

export { AmPm, HourType }

const toCallback = <T extends (payload: any) => any>(
  dispatch: React.Dispatch<any>,
  actionCreator: T,
) => (...p: Parameters<T>) => {
  dispatch((actionCreator as any)(...p))
}

export const useTime = (): [State, (h: HourType) => void] => {
  const { state, dispatch } = useContext(TimeContext)
  let time: Time | undefined
  useEffect(() => {
    time = new Time()
    dispatch(
      actions.init({
        amPm: time.getAmPm(),
        hours: time.getHours(),
        hourType: time.getHourType(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds(),
      }),
    )
    time.on('hours', toCallback(dispatch, actions.setHours))
    time.on('minutes', toCallback(dispatch, actions.setMinutes))
    time.on('seconds', toCallback(dispatch, actions.setSeconds))
    time.on('hourType', toCallback(dispatch, actions.setHourType as any))
  }, [])

  const setHourTypeOnTime = useCallback(
    (hourType: HourType) => {
      time && time.setHourType(hourType)
    },
    [time],
  )

  return [state, setHourTypeOnTime]
}
