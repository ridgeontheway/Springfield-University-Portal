import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import ReactPasswordStrength from 'react-password-strength'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from 'prop-types'
import '../styles.css'

export default class NewUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formSubmission: false,
      validPassword: ''
    }
    this.passwordStrength = this.passwordStrength.bind(this)
  }

  // Checks if email is in the correct format
  validateEmail(emailEntered) {
    var emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRE.test(emailEntered)
  }

  passwordStrength(passwordInfo) {
    const passwordScore = passwordInfo['score']
    const isValid = passwordInfo['isValid']
    const password = passwordInfo['password']
    if (passwordScore >= 3 && isValid) {
      this.setState({ validPassword: password })
    }
  }

  handleOnClick(event) {
    event.preventDefault()
    const _name = event.target.elements.name.value
    const _surname = event.target.elements.surname.value
    const _email = event.target.elements.email.value
    const _password = this.state.validPassword
    const _address = event.target.elements.address.value
    const _phone = event.target.elements.phone.value
    const _gender = event.target.elements.gender.value
    const _nationality = event.target.elements.nationality.value
    const _role = event.target.elements.role.value
    var validForm = true
    if (
      !this.props.handleOnMissingData(
        _name,
        _surname,
        _email,
        _phone,
        _nationality,
        _address,
        _role
      )
    ) {
      validForm = false
      alert('Please enter all form fields correctly')
    }
    if (!this.validateEmail(_email)) {
      validForm = false
      alert('Please enter a valid email')
    }
    if (!_password) {
      validForm = false
      alert('Please enter a strong password')
    }
    if (validForm) {
      this.setState({ formSubmission: true })
      this.props.handleOnDataSubmission(
        _name,
        _surname,
        _email,
        _address,
        _phone,
        _gender,
        _nationality,
        _password,
        _role
      )
    }
  }

  render() {
    const inputProps = {
      placeholder: 'Try a password...',
      autoFocus: true,
      className: 'another-input-prop-class-name'
    }
    return (
      <div className="container">
        <Form
          onSubmit={e => {
            this.handleOnClick(e)
          }}>
          <Form.Group controlId="name" className="formPadding">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your given name" />
          </Form.Group>

          <Form.Group controlId="surname" className="formPadding">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter your given surname" />
          </Form.Group>

          <Form.Group controlId="email" className="formPadding">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="password" className="formPadding">
            <Form.Label>Password</Form.Label>
            <ReactPasswordStrength
              minLength={5}
              minScore={2}
              changeCallback={this.passwordStrength}
              inputProps={{ ...inputProps, id: 'inputPassword1' }}
            />
          </Form.Group>

          <Form.Group controlId="address" className="formPadding">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              ref={this.addressInput}
              placeholder="Enter your current address"
            />
          </Form.Group>

          <Form.Group controlId="phone" className="formPadding">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              ref={this.phoneInput}
              placeholder="Enter your phone number"
            />
          </Form.Group>

          <Form.Group controlId="nationality" className="formPadding">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              ref={this.nationalityInput}
              placeholder="Enter your country of birth"
            />
          </Form.Group>

          <Form.Group controlId="gender" className="formPadding">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" ref={this.genderInput}>
              <option>Male</option>
              <option>Female</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="role" className="formPadding">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={this.genderInput}>
              <option>Student</option>
              <option>Staff</option>
            </Form.Control>
          </Form.Group>

          <div>
            {this.state.formSubmission ? (
              <Button variant="primary" type="submit" disabled block>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span className="sr-only">Loading...</span>
              </Button>
            ) : (
              <Button variant="primary" type="submit" block>
                Sign up
              </Button>
            )}
          </div>
        </Form>
      </div>
    )
  }
}

NewUserForm.propTypes = {
  handleOnMissingData: PropTypes.func.isRequired,
  handleOnDataSubmission: PropTypes.func.isRequired
}
