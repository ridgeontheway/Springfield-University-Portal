import React, { Component } from 'react'
import Screen from './Screen'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import PropTypes from 'prop-types'

class CreateUserScreen extends Component {
  constructor(props) {
    super(props)
    this.onFormDataSubmission = this.onFormDataSubmission.bind(this)
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

  render() {
    return (
      <div className="backgroundDiv">
        <Screen
          OnMissingData={this.onMissingData}
          OnFormDataSubmission={this.onFormDataSubmission}
          OnUserRegistrationComplete={this.props.OnUserRegistrationComplete}
        />
      </div>
    )
  }
}

CreateUserScreen.propTypes = {
  OnUserRegistrationComplete: PropTypes.func.isRequired
}

export default connect(null, actions)(CreateUserScreen)
