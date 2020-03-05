import { ENROLLED_MODULES } from '../actions/types'
export default function enrolledModuleReducer(state = null, action) {
  switch (action.type) {
    case ENROLLED_MODULES:
      return action.result || false
    default:
      return state
  }
}
