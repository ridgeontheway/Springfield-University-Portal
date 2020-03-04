import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import '../styles.css'
export default class EditStudentGradePopup extends Component {
  handleOnClick(event) {
    event.preventDefault()
    const grade = event.target.grade.value ? event.target.grade.value : ''
    this.props.send_edited_info(
      this.props.module_id,
      this.props.student_id,
      grade
    )
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
              <Form.Group controlId="grade">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a new grade for the student"
                />
              </Form.Group>

              <Button variant="primary" type="submit" block>
                Edit Grade Information
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

EditStudentGradePopup.propTypes = {
  send_edited_info: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  module_title: PropTypes.string.isRequired,
  module_id: PropTypes.number.isRequired,
  student_id: PropTypes.number.isRequired
}
