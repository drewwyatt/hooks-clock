import * as React from 'react'
import { Action, State, reducer, DEFAULT_STATE } from './state'

const { createContext, useReducer } = React

type StateWithDispatch = {
  state: State
  dispatch: React.Dispatch<Action>
}

export const TimeContext = createContext<StateWithDispatch>(undefined as any)

export const TimeContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, DEFAULT_STATE)
  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {children}
    </TimeContext.Provider>
  )
}
