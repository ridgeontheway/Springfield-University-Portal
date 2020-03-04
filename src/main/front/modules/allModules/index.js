import React, { Component } from 'react'
import { connect } from 'react-redux'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class AllModulesScreen extends Component {
  constructor() {
    super()
    this.processCourseInfo = this.processCourseInfo.bind(this)
    this.processPayment = this.processPayment.bind(this)
  }

  componentDidMount() {
    this.props.getAllModules()
  }

  processCourseInfo(_courseID) {
    console.log(
      'this is the processing that I am doing with the course name...'
    )
    this.props.enrolInModule(_courseID)
  }

  processPayment(_courseID) {
    // TODO here is where I will be enrolling the student
  }

  render() {
    return (
      <div className="backgroundDiv">
        <Screen
          processCourseInfo={this.processCourseInfo}
          processPayment={this.processPayment}
        />
      </div>
    )
  }
}

export default connect(null, actions)(AllModulesScreen)
