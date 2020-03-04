import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../styles.css'
export default class EditModulePopup extends Component {
  handleOnClick(event) {
    event.preventDefault()
    const _moduleTitle = event.target.module_title.value
    const _moduleCoordinator = event.target.module_coordinator.value
    console.log(_moduleTitle)
    console.log(_moduleCoordinator)
    this.props.send_edited_info(this.props.id, _moduleCoordinator, _moduleTitle)
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
              <Form.Group controlId="module_title">
                <Form.Label>Module Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.props.module_title}
                />
              </Form.Group>

              <Form.Group controlId="module_coordinator">
                <Form.Label>Module Coordinator</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={this.props.coordinator}
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

EditModulePopup.propTypes = {
  send_edited_info: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  module_title: PropTypes.string.isRequired,
  coordinator: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}
