import { CREATE_USER } from '../actions/types'

export default function userReducer(state = null, action) {
  switch (action.type) {
    case CREATE_USER:
      console.log('We have created the user!!')
      console.log(JSON.stringify(action.payload))
      const data = action.payload
      const returnValue = { email: data.email, password: data.password }
      return returnValue || false
    default:
      return state
  }
}
