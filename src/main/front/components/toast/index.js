import React, { Component } from 'react'
import Toast from 'react-bootstrap/Toast'
export default class ToastComponent extends Component {
  render() {
    return (
      <Toast
        onClose={this.props.onClose}
        show={this.props.show}
        onClick={this.props.onClose}
        delay={3000}
        autohide>
        <Toast.Header>
          <strong className="mr-auto">Registration</strong>
        </Toast.Header>
        <Toast.Body>{this.props.text}</Toast.Body>
      </Toast>
    )
  }
}
