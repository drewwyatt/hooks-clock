import { Action, State } from './models'

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'init':
      return { ...state, ...action.payload }
    case 'setHours':
      return { ...state, hours: action.payload }
    case 'setMinutes':
      return { ...state, minutes: action.payload }
    case 'setSeconds':
      return { ...state, seconds: action.payload }
    case 'setHourType':
      return {
        ...state,
        hourType: action.payload.hourType,
        hours: action.payload.currentTime.hours,
        amPm: action.payload.currentTime.amPm,
      }
    case 'setAmPm':
      return { ...state, amPm: action.payload }
    default:
      return state
  }
}
