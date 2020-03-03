import { combineReducers } from 'redux'
import userReducer from './userReducer'
import moduleReducer from './moduleReducer'
import enrolledModuleReducer from './enrolledModuleReducer'
import nationalityAnalyticsReducer from './nationalityAnalyticsReducer'

export default combineReducers({
  user: userReducer,
  modules: moduleReducer,
  enrolledModules: enrolledModuleReducer,
  nationalities: nationalityAnalyticsReducer
})
