import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default class ModuleRegistrationPopup extends Component {
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
            <h3>Register for {this.props.course_name}</h3>
            <p></p>
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
  title: PropTypes.string.isRequired,
  course_name: PropTypes.string.isRequired,
  module_ID: PropTypes.string.isRequired,
  module_price: PropTypes.number.isRequired,
  student_funds: PropTypes.number.isRequired
}
