import React, { Component } from 'react'
import { connect } from 'react-redux'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class AllModulesScreen extends Component {
  constructor() {
    super()
    this.processCourseInfo = this.processCourseInfo.bind(this)
  }

  componentDidMount() {
    this.props.getAllModules()
  }

  processCourseInfo(_courseID) {
    this.props.enrolInModule(_courseID)
  }

  render() {
    return (
      <div className="backgroundDiv">
        <Screen processCourseInfo={this.processCourseInfo} />
      </div>
    )
  }
}

export default connect(null, actions)(AllModulesScreen)
