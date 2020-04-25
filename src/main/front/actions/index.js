import fetch from 'isomorphic-fetch'
import {
  CREATE_USER,
  ALL_MODULES,
  ENROLLED_MODULES,
  NATIONALITY_ANALYTICS,
  ADD_MODULE_STATUS,
  ALL_STUDENTS,
  NEW_USER_LOG_IN,
  USER_LOGGED_IN,
  INVALID_AUTH
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
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: CREATE_USER, payload: result })
      }
    })
    .catch(err => {
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
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: CREATE_USER, payload: result })
      }
    })
    .catch(err => {
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
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: NEW_USER_LOG_IN, payload: result })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const getAllModules = () => async dispatch => {
  fetch('http://localhost:8080/api/modules', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: ALL_MODULES, payload: result })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const getAllStudents = () => async dispatch => {
  fetch('http://localhost:8080/api/students', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: ALL_STUDENTS, payload: result })
      }
    })
}

//TODO: this needs to be fixed when we have log-in functionality
export const getEnrolledModules = _studentID => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        const _studentID = result['id']
        fetch('http://localhost:8080/api/enrollments/student/' + _studentID, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(result => {
            if (result.hasOwnProperty('error')) {
              dispatch({ type: INVALID_AUTH, payload: true })
            } else {
              dispatch({ type: ENROLLED_MODULES, result })
            }
          })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const unenrollStudentFromModule = _moduleID => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        const _studentID = result['id']

        fetch('http://localhost:8080/api/enrollments', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student: _studentID,
            module: _moduleID
          })
        })
          .then(deleteResponse => deleteResponse.json())
          .then(deleteResult => {
            if (deleteResult.hasOwnProperty('error')) {
              dispatch({ type: INVALID_AUTH, payload: true })
            } else {
              fetch(
                'http://localhost:8080/api/enrollments/student/' + _studentID,
                {
                  method: 'GET'
                }
              )
                .then(enrolledResponse => enrolledResponse.json())
                .then(enrolledResult => {
                  dispatch({ type: ENROLLED_MODULES, enrolledResult })
                })
            }
          })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const getNationalityAnalytics = () => async dispatch => {
  fetch('http://localhost:8080/api/analytics/nationality', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: NATIONALITY_ANALYTICS, result })
      }
    })
}

export const enrolInModule = _moduleID => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        const _studentID = result['id']
        fetch('http://localhost:8080/api/enrollments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            student: _studentID,
            module: _moduleID
          })
        })
          .then(enrolledResponse => enrolledResponse.json())
          .then(enrolledResult => {
            if (enrolledResult.hasOwnProperty('error')) {
              dispatch({ type: INVALID_AUTH, payload: true })
            } else {
              dispatch({ type: ADD_MODULE_STATUS, result: 'enrolled' })
            }
          })
      }
    })
    .catch(err => {
      console.error(err)
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
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        fetch('http://localhost:8080/api/enrollments/student/' + _studentID, {
          method: 'GET'
        })
          .then(response => response.json())
          .then(result => {
            if (result.hasOwnProperty('error')) {
              dispatch({ type: INVALID_AUTH, payload: true })
            } else {
              dispatch({ type: ENROLLED_MODULES, result })
            }
          })
      }
    })
}

export const editModuleDetails = (
  _moduleID,
  _coordinator,
  _title
) => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(currentUser => {
      if (currentUser.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        fetch('http://localhost:8080/api/modules/' + _moduleID, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: _title,
            coordinator_name: _coordinator
          })
        })
          .then(updateModuleResponse => updateModuleResponse.json())
          .then(updateModuleResponseResult => {
            if (updateModuleResponseResult.hasOwnProperty('error')) {
              dispatch({ type: INVALID_AUTH, payload: true })
            } else {
              fetch('http://localhost:8080/api/modules', {
                method: 'GET'
              })
                .then(allModules => allModules.json())
                .then(allModulesResult => {
                  dispatch({ type: ALL_MODULES, payload: allModulesResult })
                })
            }
          })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const getLoggedInUser = () => async dispatch => {
  fetch('http://localhost:8080/api/login', {
    method: 'GET'
  })
    .then(response => response.json())
    .then(result => {
      if (result.hasOwnProperty('error')) {
        dispatch({ type: INVALID_AUTH, payload: true })
      } else {
        dispatch({ type: USER_LOGGED_IN, payload: result })
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export const resetError = () => async dispatch => {
  dispatch({ type: INVALID_AUTH, payload: false })
}
