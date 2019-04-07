import { createContext } from 'react'
import { act, cleanup, renderHook } from 'react-hooks-testing-library'
import { DEFAULT_STATE, State, actions } from './state'
import { useTime as hook, HourType, AmPm } from './useTime'

/*********
 * Mocks *
 *********/

jest.useFakeTimers()

let CURR_HOURS = 0
let CURR_MINUTES = 0
let CURR_SECONDS = 0

Date.prototype.getHours = jest.fn().mockReturnValue(CURR_HOURS)
Date.prototype.getMinutes = jest.fn().mockReturnValue(CURR_MINUTES)
Date.prototype.getSeconds = jest.fn().mockReturnValue(CURR_SECONDS)

const advanceTimeBySeconds = (n: number) => {
  CURR_SECONDS++
  for (let i = n; i > 0; i--) {
    CURR_SECONDS++
    ;(Date.prototype.getSeconds as jest.Mock).mockReturnValue(CURR_SECONDS)
    jest.advanceTimersByTime(1000)
  }
}

type TimeEvent = Parameters<typeof actions.setHourType>[1]
const getTimeEvent = (hourType: HourType, amPm: AmPm = AmPm.am): TimeEvent =>
  ({
    hours: CURR_HOURS,
    minutes: CURR_MINUTES,
    seconds: CURR_SECONDS,
    amPm: AmPm.am,
    hourType,
  } as any)

/****************
 * Test Harness *
 ****************/

const makeContext = (state: State, dispatch: () => any = jest.fn()) =>
  createContext({ state, dispatch })

const useTime = (context: ReturnType<typeof makeContext>) =>
  renderHook(() => hook(context))

/*********
 * Tests *
 *********/

afterEach(cleanup)

describe('useTime', () => {
  let dispatch: jest.Mock<any>
  let result: ReturnType<typeof useTime>['result']
  beforeAll(() => {
    dispatch = jest.fn()
    const r = useTime(makeContext(DEFAULT_STATE, dispatch))
    result = r.result
  })

  afterEach(() => {
    dispatch.mockReset()
  })

  it('will initialize itself', () => {
    expect(dispatch).toHaveBeenCalledTimes(1)
  })

  it('can return a state', () => {
    const [state] = result.current
    expect(state).toEqual(DEFAULT_STATE)
  })

  it('Dispatches an action each second', () => {
    advanceTimeBySeconds(5)
    expect(dispatch).toHaveBeenCalledTimes(5)
  })

  it('returns a callback to update hourType', () => {
    const [, updateHourType] = result.current
    act(() => {
      updateHourType(HourType.twelve)
    })
    expect(dispatch).toHaveBeenCalledWith(
      actions.setHourType(HourType.twelve, getTimeEvent(HourType.twelve)),
    )
  })
})
