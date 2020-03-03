import { ENROLLED_MODULES } from '../actions/types'
export default function enrolledModuleReducer(state = null, action) {
  switch (action.type) {
    case ENROLLED_MODULES:
      console.log('we now have all the enrolled modules', action.result)
      return action.result || false
    default:
      return state
  }
}
