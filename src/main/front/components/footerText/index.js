import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './styles.css'

export default class FooterText extends Component {
  render() {
    return (
      <div>
        <h1 className="createUser" onClick={this.props.onClick}>
          Create User
        </h1>
      </div>
    )
  }
}

FooterText.propTypes = {
  onClick: PropTypes.func
}
