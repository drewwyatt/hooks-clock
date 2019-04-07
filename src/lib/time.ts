export enum HourType {
  twelve = '12 hour',
  twentyFour = '24 hour',
}

const isTwelveHour = (hourType: HourType): hourType is HourType.twelve =>
  hourType === HourType.twelve

export enum AmPm {
  am = 'am',
  pm = 'pm',
  na = '',
}

type BaseTimeEvent = {
  hours: number
  minutes: number
  seconds: number
}

export interface TwelveHourTimeEvent extends BaseTimeEvent {
  hourType: HourType.twelve
  amPm: AmPm.am | AmPm.pm
}

export interface TwentyFourHourTimeEvent extends BaseTimeEvent {
  hourType: HourType.twelve
  amPm: AmPm.na
}

const INTERVAL_KEY = 'DREWS_INTERVAL_KEY'
const setThatOneInterval = (n: number) => {
  if ((window as any)[INTERVAL_KEY]) {
    console.log('clearing...')
    clearInterval((window as any)[INTERVAL_KEY])
  }

  ;(window as any)[INTERVAL_KEY] = n
}

export type TimeEvent = TwelveHourTimeEvent | TwentyFourHourTimeEvent

interface EventParams {
  hours: number
  minutes: number
  seconds: number

  hourType: HourType
}

type EventCallback<T> = (val: T, timeEvent: TimeEvent) => void

type CallbackSet = Record<keyof EventParams, EventCallback<any>>

export class Time {
  private _hours: number
  private _minutes: number
  private _seconds: number
  private _hourType: HourType = HourType.twentyFour
  private callbacks: Partial<CallbackSet> = {}

  constructor() {
    const date = new Date()
    this._hours = date.getHours()
    this._minutes = date.getMinutes()
    this._seconds = date.getSeconds()

    setThatOneInterval(setInterval(this._handleInterval.bind(this), 1000))
  }

  public setHourType(value: HourType) {
    this.set('hourType', value)
  }

  public getHourType() {
    return this._hourType
  }

  public getHours(): number {
    return isTwelveHour(this._hourType) && this._hours > 12
      ? this._hours - 12
      : this._hours
  }

  public getMinutes(): number {
    return this._minutes
  }

  public getSeconds(): number {
    return this._seconds
  }

  public getAmPm(): AmPm {
    if (isTwelveHour(this.getHourType())) {
      return this._hours > 11 ? AmPm.pm : AmPm.am
    }

    return AmPm.na
  }

  public on<TEvent extends keyof EventParams>(
    event: TEvent,
    callback: EventCallback<EventParams[TEvent]>,
  ): void {
    this.callbacks[event] = callback
  }

  private _handleInterval() {
    const date = new Date()
    this.set('hours', date.getHours())
    this.set('minutes', date.getMinutes())
    this.set('seconds', date.getSeconds())
  }

  private getTimeEvent(): TimeEvent {
    return {
      hours: this.getHours(),
      minutes: this.getMinutes(),
      seconds: this.getSeconds(),
      hourType: this.getHourType(),
      amPm: this.getAmPm(),
    } as TimeEvent
  }

  private set(
    key: 'hours' | 'minutes' | 'seconds' | 'hourType',
    value: number | HourType,
  ) {
    if (key === 'hourType' && this._hourType !== value) {
      this._hourType = value as HourType
      this.triggerCallbackIfExists(key, value as any)
    } else if (['hours', 'minutes', 'seconds'].indexOf(key) > -1) {
      if (this['_' + key]! !== (value as number)) {
        this['_' + key] = value as number
        this.triggerCallbackIfExists(key, value as any)
      }
    }
  }

  private triggerCallbackIfExists<TEvent extends keyof EventParams>(
    event: TEvent,
    params: EventParams[TEvent],
  ) {
    if (event in this.callbacks) {
      this.callbacks[event](params, this.getTimeEvent())
    }
  }
}
