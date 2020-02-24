import React, { Component } from 'react'
import Screen from './Screen'
import PropTypes from 'prop-types'

export default class LoginScreen extends Component {
  render() {
    return (
      <div className="backgroundDiv">
        <Screen handleRegisterClicked={this.props.OnRegisterClicked} />
      </div>
    )
  }
}

LoginScreen.propTypes = {
  OnRegisterClicked: PropTypes.func.isRequired
}
