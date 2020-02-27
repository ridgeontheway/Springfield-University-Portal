import React, { Component } from 'react'
import Screen from './Screen'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'

class CreateUserScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.onFormDataSubmission = this.onFormDataSubmission.bind(this)
    this.onRedirect = this.onRedirect.bind(this)
  }

  onMissingData(_name, _surname, _email, _phone, _nationality) {
    return _name && _surname && _email && _phone && _nationality
  }

  onFormDataSubmission(
    _name,
    _surname,
    _email,
    _address,
    _phone,
    _gender,
    _nationality
  ) {
    this.props.createUser(
      _name,
      _surname,
      _email,
      _address,
      _phone,
      _gender,
      _nationality
    )
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
              pathname: '/dashboard'
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
