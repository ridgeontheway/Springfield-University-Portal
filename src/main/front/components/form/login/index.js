import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../styles.css'

export default class LoginForm extends Component {
  render() {
    return (
      <div className="container">
        <Form>
          <Form.Group controlId="idLogin">
            <Form.Label>ID</Form.Label>
            <Form.Control type="text" placeholder="Enter your assigned ID" />
          </Form.Group>

          <Form.Group controlId="passwordLogin">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your password" />
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
  onClick: PropTypes.func
}
