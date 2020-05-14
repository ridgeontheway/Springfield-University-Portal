import { INVALID_AUTH } from '../actions/types'
export default function invalidAuthReducer(state = null, action) {
  switch (action.type) {
    case INVALID_AUTH:
      return action.payload || false
    default:
      return state
  }
}
