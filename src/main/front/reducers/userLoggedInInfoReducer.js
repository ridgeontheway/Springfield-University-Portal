import { LOGGED_IN_USER_INFO } from '../actions/types'
export default function userLoggedInInfoReducer(state = null, action) {
  switch (action.type) {
    case LOGGED_IN_USER_INFO:
      return action.payload || false
    default:
      return state
  }
}
