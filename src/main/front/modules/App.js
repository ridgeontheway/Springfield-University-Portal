import React, { Component } from 'react'

import CreateUserScreen from './createUser'
import LoginScreen from './login'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRegistered: false
    }
    this.userRegistrationCompleted = this.userRegistrationCompleted.bind(this)
    this.userRegistrationUnFinished = this.userRegistrationUnFinished.bind(this)
  }

  userRegistrationCompleted() {
    this.setState({ userRegistered: true })
  }

  userRegistrationUnFinished() {
    this.setState({ userRegistered: false })
  }

  render() {
    return (
      <div>
        {this.state.userRegistered ? (
          <LoginScreen OnRegisterClicked={this.userRegistrationUnFinished} />
        ) : (
          <CreateUserScreen
            OnUserRegistrationComplete={this.userRegistrationCompleted}
          />
        )}
      </div>
    )
  }
}
