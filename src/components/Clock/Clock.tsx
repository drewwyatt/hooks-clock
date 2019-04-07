import * as React from 'react'
import { AmPm, HourType, useTime } from './useTime'

type ViewProps = {
  hours: number
  minutes: number
  seconds: number
  amPm: AmPm
  hourType: HourType
}

const pad0 = (n: number): string => {
  const str = n.toString()
  return str.length > 1 ? str : '0' + str
}

const View: React.FC<ViewProps> = ({ hours, minutes, seconds, amPm }) => {
  const numbers = [hours, minutes, seconds].map(pad0).join(':')
  return <h1>{`${numbers} ${amPm}`}</h1>
}

type ControlsProps = {
  setHourType(ht: HourType): void
}
const Controls: React.FC<ControlsProps> = ({ setHourType }) => (
  <>
    <button onClick={() => setHourType(HourType.twelve)}>12 hour</button>
    <button onClick={() => setHourType(HourType.twentyFour)}>24 hour</button>
  </>
)

export const Clock: React.FC = () => {
  const [state, setHourType] = useTime()
  return (
    <fieldset>
      <legend>Clock</legend>
      <View {...state} />
      <Controls setHourType={setHourType} />
    </fieldset>
  )
}
