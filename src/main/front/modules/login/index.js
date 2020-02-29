import React, { Component } from 'react'
import Screen from './Screen'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      pathname: '/'
    }
    this.onNewUser = this.onNewUser.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  onNewUser() {
    this.setState({ redirect: true, pathname: '/new-user' })
  }

  onLogin() {
    this.setState({ redirect: true, pathname: '/dashboard' })
  }

  render() {
    return (
      <div className="backgroundDiv">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: this.state.pathname
            }}
          />
        ) : (
          <Screen onNewUser={this.onNewUser} onLoginPressed={this.onLogin} />
        )}
      </div>
    )
  }
}
