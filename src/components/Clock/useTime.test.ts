import { createContext } from 'react'
import { cleanup, renderHook } from 'react-hooks-testing-library'
import { DEFAULT_STATE } from './state'

/*********
 * Mocks *
 *********/

const MyContext = createContext({ state: DEFAULT_STATE, dispatch: jest.fn() })

/*********
 * Tests *
 *********/
import { useTime } from './useTime'
afterEach(cleanup)

describe('useTime', () => {
  it('does something', () => {
    const {
      result: { current },
    } = renderHook(() => useTime(MyContext))
    const [a] = current
    expect(a).toEqual(DEFAULT_STATE)
  })
})
