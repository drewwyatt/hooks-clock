import { createContext } from 'react'
import { cleanup, renderHook } from 'react-hooks-testing-library'
import { DEFAULT_STATE, State } from './state'
import { useTime as hook } from './useTime'

/*********
 * Setup *
 *********/

const makeContext = (state: State, dispatch: () => any = jest.fn()) =>
  createContext({ state, dispatch })

const useTime = (context: ReturnType<typeof makeContext>) =>
  renderHook(() => hook(context))

/*********
 * Tests *
 *********/
afterEach(cleanup)

describe('useTime', () => {
  it('does something', () => {
    const {
      result: { current },
    } = useTime(makeContext(DEFAULT_STATE))
    const [a] = current
    expect(a).toEqual(DEFAULT_STATE)
  })
})
