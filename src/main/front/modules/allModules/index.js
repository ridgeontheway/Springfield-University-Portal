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

  processCourseInfo(course_name) {
    console.log(
      'this is the processing that I am doing with the course name...'
    )
  }

  processPayment() {
    console.log('I am processing the payment now......')
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
