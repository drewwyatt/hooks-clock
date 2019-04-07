import { HourType, AmPm } from '../../../../lib'

export type State = {
  hours: number
  minutes: number
  seconds: number
  hourType: HourType
  amPm: AmPm
}

export const DEFAULT_STATE: State = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  hourType: HourType.twentyFour,
  amPm: AmPm.na,
}
