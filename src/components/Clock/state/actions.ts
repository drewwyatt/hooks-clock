import { HourType, TimeEvent, AmPm } from '../../../lib'
import { State } from './models'

export const setHours = (payload: number) => ({
  type: 'setHours' as 'setHours',
  payload,
})

export const setMinutes = (payload: number) => ({
  type: 'setMinutes' as 'setMinutes',
  payload,
})

export const setSeconds = (payload: number) => ({
  type: 'setSeconds' as 'setSeconds',
  payload,
})

export const setHourType = (hourType: HourType, currentTime: TimeEvent) => ({
  type: 'setHourType' as 'setHourType',
  payload: {
    hourType,
    currentTime,
  },
})

export const setAmPm = (payload: AmPm) => ({
  type: 'setAmPm' as 'setAmPm',
  payload,
})

export const init = (payload: State) => ({
  type: 'init' as 'init',
  payload,
})
