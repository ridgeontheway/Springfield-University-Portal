import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class ModuleRegistrationPopup extends Component {
  handleOnClick(event) {
    event.preventDefault()
    this.props.register()
  }
  render() {
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content__wrapper">
            <Form
              onSubmit={e => {
                this.handleOnClick(e)
              }}>
              <Form.Group controlId="idLogin">
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter your payment information"
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Register
              </Button>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

ModuleRegistrationPopup.propTypes = {
  register: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}
