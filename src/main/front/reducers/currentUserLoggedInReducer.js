import { USER_LOGGED_IN } from '../actions/types'
export default function currentUserLoggedInReducer(state = null, action) {
  switch (action.type) {
    case USER_LOGGED_IN:
      console.log(action)
      return action.payload || false
    default:
      return state
  }
}
