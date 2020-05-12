import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class EditGradesScreen extends Component {
  constructor(props) {
    super(props)
    this.getModulesFromStudent = this.getModulesFromStudent.bind(this)
    this.sendEditedGradeInfo = this.sendEditedGradeInfo.bind(this)
    this.state = {
      APIError: false
    }
  }

  componentDidMount() {
    this.props.getAllStudents()
  }

  getModulesFromStudent(_studentID) {
    this.props.getEnrolledModules(_studentID)
  }

  sendEditedGradeInfo(_moduleID, _studentID, _newGrade) {
    this.props.assignStudentGrade(_moduleID, _studentID, _newGrade)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error && props.error != state.error) {
      return {
        APIError: props.error
      }
    }
    return null
  }

  redirectStateBasedOnError() {
    if (this.state.APIError) {
      return (
        <Redirect
          push
          to={{
            pathname: '/error'
          }}
        />
      )
    } else {
      return (
        <Screen
          getModulesForStudent={this.getModulesFromStudent}
          sendEditedGradeInfo={this.sendEditedGradeInfo}
        />
      )
    }
  }

  render() {
    return (
      <div className="backgroundDiv">{this.redirectStateBasedOnError()}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.error
  }
}

export default connect(mapStateToProps, actions)(EditGradesScreen)
