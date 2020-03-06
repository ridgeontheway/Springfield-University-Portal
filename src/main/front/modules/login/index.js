import React, { Component } from 'react'
import Screen from './Screen'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class LoginScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      pathname: '/'
    }
    this.onNewUser = this.onNewUser.bind(this)
    this.onLogin = this.onLogin.bind(this)
    this.handleOnMissingData = this.handleOnMissingData.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.newLogin && !state.redirect) {
      return {
        redirect: true,
        pathname: '/dashboard'
      }
    }
    return null
  }

  handleOnMissingData(_email, _password, _role) {
    return _email && _password && _role
  }

  onNewUser() {
    this.setState({ redirect: true, pathname: '/new-user' })
  }

  onLogin(_email, _password, _role) {
    this.props.login(_email, _password, _role)
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
          <Screen
            onNewUser={this.onNewUser}
            onLoginPressed={this.onLogin}
            handleOnMissingData={this.handleOnMissingData}
          />
        )}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    newLogin: state.newLogin
  }
}

export default connect(mapStateToProps, actions)(LoginScreen)
