import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './styles.css'

export default class Description extends Component {
  render () {
    return (
      <h2 className='style'>{this.props.text}</h2>
    )
  }
}

Description.propTypes = {
  text: PropTypes.string.isRequired
}
