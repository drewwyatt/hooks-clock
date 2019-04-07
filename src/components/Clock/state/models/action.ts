import * as actions from '../actions'
export type Action = ReturnType<typeof actions[keyof typeof actions]>
