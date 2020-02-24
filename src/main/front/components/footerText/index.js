import React, { Component } from 'react'
import './styles.css'

export default class FooterText extends Component {
  render() {
    return (
      // TODO: issue with onClick
      <div>
        <h1 className="createUser" onClick={this.props.onClick}>
          Create User
        </h1>
      </div>
    )
  }
}
