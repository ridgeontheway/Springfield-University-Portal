import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import PropTypes from 'prop-types'
import '../styles.css'

export default class NewUserForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formSubmission: false
    }
  }

  async handleOnClick(event) {
    event.preventDefault()
    this.setState({ formSubmission: true })
    const _name = event.target.elements.name.value
    const _surname = event.target.elements.surname.value
    const _email = event.target.elements.email.value
    const _address = event.target.elements.address.value
    const _phone = event.target.elements.phone.value
    const _gender = event.target.elements.gender.value
    const _nationality = event.target.elements.nationality.value
    if (
      this.props.handleOnMissingData(
        _name,
        _surname,
        _email,
        _phone,
        _nationality
      )
    ) {
      this.props.handleOnDataSubmission(
        _name,
        _surname,
        _email,
        _address,
        _phone,
        _gender,
        _nationality
      )
    } else {
      console.log('invalid data!!!')
    }
  }

  render() {
    return (
      <div className="container">
        <Form
          onSubmit={e => {
            this.handleOnClick(e)
          }}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your given name" />
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label>Surname</Form.Label>
            <Form.Control type="text" placeholder="Enter your given surname" />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              ref={this.addressInput}
              placeholder="Enter your current address"
            />
          </Form.Group>

          <Form.Group controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              ref={this.phoneInput}
              placeholder="Enter your phone number"
            />
          </Form.Group>

          <Form.Group controlId="nationality">
            <Form.Label>Nationality</Form.Label>
            <Form.Control
              type="text"
              ref={this.nationalityInput}
              placeholder="Enter your country of birth"
            />
          </Form.Group>

          <Form.Group controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Control as="select" ref={this.genderInput}>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to answer</option>
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
