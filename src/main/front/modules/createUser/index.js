import React, { Component } from 'react'
import Screen from './Screen'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'
import '../styles.css'
class CreateUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.onFormDataSubmission = this.onFormDataSubmission.bind(this)
    this.onRedirect = this.onRedirect.bind(this)
  }

  onMissingData(
    _name,
    _surname,
    _email,
    _phone,
    _nationality,
    _password,
    _role
  ) {
    return (
      _name &&
      _surname &&
      _email &&
      _phone &&
      _nationality &&
      _password &&
      _role
    )
  }

  onFormDataSubmission(
    _name,
    _surname,
    _email,
    _address,
    _phone,
    _gender,
    _nationality,
    _password,
    _role
  ) {
    if (_role === 'Student') {
      this.props.createUser(
        _name,
        _surname,
        _email,
        _address,
        _phone,
        _gender,
        _nationality,
        _password
      )
    } else {
      this.props.createStaff(
        _name,
        _surname,
        _email,
        _address,
        _phone,
        _gender,
        _nationality,
        _password
      )
    }
  }

  onRedirect() {
    this.setState({ redirect: true })
  }

  render() {
    return (
      <div className="backgroundDiv">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: '/'
            }}
          />
        ) : (
          <Screen
            OnMissingData={this.onMissingData}
            OnFormDataSubmission={this.onFormDataSubmission}
            OnUserRegistrationComplete={this.onRedirect}
          />
        )}
      </div>
    )
  }
}

export default connect(null, actions)(CreateUserScreen)
