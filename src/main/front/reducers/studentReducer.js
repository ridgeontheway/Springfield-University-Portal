import { ALL_STUDENTS } from '../actions/types'
export default function studentReducer(state = null, action) {
  switch (action.type) {
    case ALL_STUDENTS:
      return action.payload || false
    default:
      return state
  }
}
