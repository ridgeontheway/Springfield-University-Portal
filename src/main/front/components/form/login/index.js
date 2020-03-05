import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../styles.css'

export default class LoginForm extends Component {
  async handleOnClick(event) {
    event.preventDefault()
    const _email = event.target.elements.email.value
    const _password = event.target.elements.password.value
    const _role = event.target.elements.role.value
    if (this.props.handleOnMissingData(_email, _password, _role)) {
      this.props.handleOnClick(_email, _password, _role)
    } else {
      alert('You have failed to fill out all the form elements :(')
    }
  }

  render() {
    return (
      <div className="container">
        <Form
          onSubmit={e => {
            this.handleOnClick(e)
          }}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control as="select" ref={this.genderInput}>
              <option>Student</option>
              <option>Staff</option>
            </Form.Control>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            onClick={this.props.onClick}
            block>
            Log in
          </Button>
        </Form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  handleOnClick: PropTypes.func,
  handleOnMissingData: PropTypes.func.isRequired
}
