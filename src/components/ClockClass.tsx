import * as React from 'react'
import { Time, TimeEvent, AmPm, HourType } from '../lib'

type State = {
  hours: number
  minutes: number
  seconds: number
  amPm: AmPm
  hourType: HourType
}

export class Clock extends React.Component<{}, State> {
  private time = new Time()
  public state = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    amPm: AmPm.na,
    hourType: HourType.twentyFour,
  }

  componentDidMount() {
    this.time.on('seconds', this.update.bind(this))
    this.time.on('hourType', this.update.bind(this))
  }

  render() {
    return (
      <fieldset>
        <legend>Clock</legend>
        <h1>{this.getFormattedTime()}</h1>
        {this.hourTypeSelect()}
      </fieldset>
    )
  }

  private hourTypeSelect = (): JSX.Element[] =>
    [HourType.twelve, HourType.twentyFour].map(this.hourTypeToRadio.bind(this))

  private hourTypeToRadio = (hourType: HourType): JSX.Element => (
    <label>
      <input
        key={hourType}
        type="radio"
        name="hour-type"
        value={hourType}
        checked={this.isSelectedHourType(hourType)}
        onChange={this.handleHourClick.bind(this)}
      />
      {hourType}
    </label>
  )

  private handleHourClick = ({ target: { value } }: any) => {
    this.time.setHourType(value)
  }

  private isSelectedHourType = (hourType: HourType): boolean =>
    hourType === this.state.hourType

  private setHourType = (hourType: HourType) => {
    this.time.setHourType(hourType)
  }

  private getFormattedTime = () => {
    const { hours, minutes, seconds, amPm } = this.state
    const numbers = [hours, minutes, seconds].map(this.pad0).join(':')
    return `${numbers} ${amPm}`
  }

  private pad0 = (n: number): string => {
    const str = n.toString()
    return str.length > 1 ? str : '0' + str
  }

  private update = (_: unknown, time: TimeEvent): void => {
    this.setState(time)
  }
}
