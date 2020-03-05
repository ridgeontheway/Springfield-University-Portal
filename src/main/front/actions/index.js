import fetch from 'isomorphic-fetch'
import {
  CREATE_USER,
  ALL_MODULES,
  ENROLLED_MODULES,
  NATIONALITY_ANALYTICS,
  ADD_MODULE_STATUS,
  ALL_STUDENTS,
  NEW_USER_LOG_IN,
  USER_LOGGED_IN
} from './types'

export const createUser = (
  _name,
  _surname,
  _email,
  _address,
  _phone,
  _gender,
  _nationality,
  _password
) => async dispatch => {
  console.log('we should be calling the action now!')
  fetch('http://localhost:8080/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: _name,
      surname: _surname,
      email: _email,
      address: _address,
      phone_number: _phone,
      gender: _gender,
      nationality: _nationality,
      password: _password
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: CREATE_USER, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error: ')
      console.error(err)
    })
}

export const createStaff = (
  _name,
  _surname,
  _email,
  _address,
  _phone,
  _gender,
  _nationality,
  _password
) => async dispatch => {
  fetch('http://localhost:8080/api/staff', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: _name,
      surname: _surname,
      email: _email,
      address: _address,
      phone_number: _phone,
      gender: _gender,
      nationality: _nationality,
      password: _password
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: CREATE_USER, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error: ')
      console.error(err)
    })
}

export const login = (_email, _password, _role) => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: _email,
      password: _password,
      user_role: _role
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: NEW_USER_LOG_IN, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error: ')
      console.error(err)
    })
}

export const getAllModules = () => async dispatch => {
  console.log('I am trying to get all the available modules now....')
  fetch('http://localhost:8080/api/modules', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: ALL_MODULES, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error')
      console.error(err)
    })
}

export const getAllStudents = () => async dispatch => {
  fetch('http://localhost:8080/api/students', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: ALL_STUDENTS, payload: result })
    })
}

//TODO: this needs to be fixed when we have log-in functionality
export const getEnrolledModules = _studentID => async dispatch => {
  //TODO: we need a simple call here to see if the user is logged in
  fetch('http://localhost:8080/api/enrollments/student/' + _studentID, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: ENROLLED_MODULES, result })
    })
}

//TODO: un-enrol from modules needs to be added and dispatch ENROLLED_MODULES when done

export const getNationalityAnalytics = () => async dispatch => {
  fetch('http://localhost:8080/api/analytics/nationality', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: NATIONALITY_ANALYTICS, result })
    })
}

export const enrolInModule = _id => async dispatch => {
  fetch('http://localhost:8080/api/modules/' + _id, {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      const moduleCost = result.cost
      dispatch({ type: ADD_MODULE_STATUS, result: 'enrolled' })
    })
}

export const assignStudentGrade = (
  _moduleID,
  _studentID,
  _newGrade
) => async dispatch => {
  fetch('http://localhost:8080/api/enrollments/grade', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      student: _studentID,
      module: _moduleID,
      grade: _newGrade
    })
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)

      fetch('http://localhost:8080/api/enrollments/student/' + _studentID, {
        method: 'GET'
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          dispatch({ type: ENROLLED_MODULES, result })
        })
    })
}

export const editModuleDetails = (
  _moduleID,
  _coordinator,
  _title
) => async dispatch => {
  console.log(_moduleID)
  console.log(_coordinator)
  console.log(_title)
  console.error('I am waiting to call the API with the new information!')
  //TODO: hook up the API call when this is fixed
  fetch('http://localhost:8080/api/modules', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      dispatch({ type: ALL_MODULES, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error')
      console.error(err)
    })
}

export const getLoggedInUser = () => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      console.log(result)
      dispatch({ type: USER_LOGGED_IN, payload: result })
    })
    .catch(err => {
      console.log('we are getting an error')
      console.error(err)
    })
}
