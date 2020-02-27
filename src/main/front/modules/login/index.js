import React, { Component } from 'react'
import Screen from './Screen'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

export default class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.onRedirect = this.onRedirect.bind(this)
  }

  onRedirect() {
    console.log('I am here!!!')
    this.setState({ redirect: true })
  }

  render() {
    return (
      <div className="backgroundDiv">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: '/new-user'
            }}
          />
        ) : (
          <Screen onNewUser={this.onRedirect} />
        )}
      </div>
    )
  }
}
