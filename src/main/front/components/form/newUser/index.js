import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'
import fetch from 'isomorphic-fetch'
import '../styles.css'

export default class NewUserForm extends Component {
  async handleOnClick (event) {
    const _name = event.target.elements.name.value
    const _surname = event.target.elements.surname.value
    const _email = event.target.elements.email.value
    const _address = event.target.elements.address.value
    const _phone = event.target.elements.phone.value
    const _gender = event.target.elements.gender.value
    if (this.props.handleOnMissingData(_name, _surname, _email, _phone)) {
      try {
        const response = await fetch('http://localhost:8080/api/students', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: _name,
            surname: _surname,
            email: _email,
            address: _address,
            phone_number: _phone,
            gender: _gender,
            nationality: 'American'
          })
        })
        const content = await response.json()
        console.log('this is the content= ', content)
      } catch (err) {
        console.error({ err })
      }
    } else {
      // TODO: look at this and display some pop-up message
      console.log('invalid data!!!')
    }
  }

  render () {
    return (
      <div className='container'>
        <Form onSubmit={(e) => this.handleOnClick(e)}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type='text' placeholder='Enter your given name' />
          </Form.Group>

          <Form.Group controlId='surname'>
            <Form.Label>Surname</Form.Label>
            <Form.Control type='text' placeholder='Enter your given surname' />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' placeholder='Enter your email' />
          </Form.Group>

          <Form.Group controlId='address'>
            <Form.Label>Address</Form.Label>
            <Form.Control type='text' ref={this.addressInput} placeholder='Enter your current address' />
          </Form.Group>

          <Form.Group controlId='phone'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type='text' ref={this.phoneInput} placeholder='Enter your phone number' />
          </Form.Group>

          <Form.Group controlId='gender'>
            <Form.Label>Gender</Form.Label>
            <Form.Control as='select' ref={this.genderInput}>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to answer</option>
            </Form.Control>
          </Form.Group>

          <Button variant='primary' type='submit' block>
                        Sign up
          </Button>
        </Form>
      </div>
    )
  }
}

NewUserForm.propTypes = {
  handleOnMissingData: PropTypes.func.isRequired
}
