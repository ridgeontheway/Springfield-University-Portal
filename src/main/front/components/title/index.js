import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class Title extends Component {
  render () {
    return (
      <h1 className='title'>
        <span className='font-weight-bold'>{this.props.text}</span>
      </h1>
    )
  }
}

Title.propTypes = {
  text: PropTypes.string.isRequired
}
