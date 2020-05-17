import { INVALID_LOG_IN } from '../actions/types'
export default function invalidLogInReducer(state = null, action) {
  switch (action.type) {
    case INVALID_LOG_IN:
      return action.payload || false
    default:
      return state
  }
}
