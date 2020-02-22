import { CREATE_USER } from '../actions/types'

export default function userReducer(state = null, action) {
  switch (action.type) {
    case CREATE_USER:
      console.log('We have created the user!!')
      console.log(JSON.stringify(action.payload))
      return action.payload.student_id || false
    default:
      return state
  }
}
