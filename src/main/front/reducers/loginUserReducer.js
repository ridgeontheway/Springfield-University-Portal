import { NEW_USER_LOG_IN } from '../actions/types'
export default function loginUserReducer(state = null, action) {
  switch (action.type) {
    case NEW_USER_LOG_IN:
      console.log(action)
      return action.payload || false
    default:
      return state
  }
}
