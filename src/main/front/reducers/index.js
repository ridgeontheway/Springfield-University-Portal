import { combineReducers } from 'redux'
import userReducer from './userReducer'
import moduleReducer from './moduleReducer'

export default combineReducers({
  user: userReducer,
  modules: moduleReducer
})
