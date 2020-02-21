import React, { Component } from 'react'
import fetch from 'isomorphic-fetch'

import CreateUserScreen from './createUser'

export default class App extends Component {
  async componentDidMount () {
    const response = await fetch('http://localhost:8080/api/students', { method: 'GET' })
    const body = await response.json()
    console.log(body)
  }

  render () {
    return (
      <CreateUserScreen />
    )
  }
}
