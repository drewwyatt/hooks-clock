import {
  init,
  setAmPm,
  setHourType,
  setHours,
  setMinutes,
  setSeconds,
} from './actions'
import { reducer } from './reducer'
import { DEFAULT_STATE } from './models'

describe('state', () => {
  // ...

  it('can update hour', () => {
    let state = reducer(DEFAULT_STATE, {} as any)
    state = reducer(state, setHours(13))
    expect(state.hours).toEqual(13)
  })

  // ...
})
