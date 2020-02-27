import fetch from 'isomorphic-fetch'
import { CREATE_USER } from './types'

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
