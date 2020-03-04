import fetch from 'isomorphic-fetch'
import {
  CREATE_USER,
  ALL_MODULES,
  ENROLLED_MODULES,
  NATIONALITY_ANALYTICS,
  ADD_MODULE_STATUS
} from './types'

export const createUser = (
  _name,
  _surname,
  _email,
  _address,
  _phone,
  _gender,
  _nationality
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
      nationality: _nationality
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

//TODO: this needs to be fixed when we have log-in functionality
export const getEnrolledModules = _studentID => async dispatch => {
  //TODO: we need a simple call here to see if the user is logged in
  fetch('http://localhost:8080/api/enrollments/student/119', {
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
