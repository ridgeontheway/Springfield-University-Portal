import { ALL_MODULES } from '../actions/types'

export default function moduleReducer(state = null, action) {
  switch (action.type) {
    case ALL_MODULES:
      console.log('we now have all the modules')
      console.log(JSON.stringify(action.payload))
      return action.payload || false
    default:
      return state
  }
}
