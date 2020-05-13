import { combineReducers } from 'redux'
import userReducer from './userReducer'
import moduleReducer from './moduleReducer'
import enrolledModuleReducer from './enrolledModuleReducer'
import nationalityAnalyticsReducer from './nationalityAnalyticsReducer'
import paymentReducer from './paymentReducer'
import studentReducer from './studentReducer'
import loginUserReducer from './loginUserReducer'
import currentUserLoggedInReducer from './currentUserLoggedInReducer'
import invalidAuthReducer from './invalidAuthReducer'
export default combineReducers({
  user: userReducer,
  modules: moduleReducer,
  enrolledModules: enrolledModuleReducer,
  nationalities: nationalityAnalyticsReducer,
  payment: paymentReducer,
  students: studentReducer,
  newLogin: loginUserReducer,
  currentUser: currentUserLoggedInReducer,
  error: invalidAuthReducer
})
