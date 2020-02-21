import React, { Component } from 'react'
import Screen from './Screen'

export default class CreateUserScreen extends Component {
  onMissingData (_name, _surname, _email, _phone) {
    return (_name && _surname && _email && _phone)
  }

  render () {
    return (
      <div className='backgroundDiv'>
        <Screen OnMissingData={this.onMissingData} />
      </div>
    )
  }
}