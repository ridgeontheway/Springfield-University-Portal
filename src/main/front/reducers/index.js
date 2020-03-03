import { combineReducers } from 'redux'
import userReducer from './userReducer'
import moduleReducer from './moduleReducer'
import enrolledModuleReducer from './enrolledModuleReducer'

export default combineReducers({
  user: userReducer,
  modules: moduleReducer,
  enrolledModules: enrolledModuleReducer
})
