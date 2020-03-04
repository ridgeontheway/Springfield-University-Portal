import { ADD_MODULE_STATUS } from '../actions/types'
export default function paymentReducer(state = null, action) {
  switch (action.type) {
    case ADD_MODULE_STATUS:
      return action.result || false
    default:
      return state
  }
}
