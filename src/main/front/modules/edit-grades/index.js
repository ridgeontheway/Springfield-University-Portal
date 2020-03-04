import React, { Component } from 'react'
import { connect } from 'react-redux'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class EditGradesScreen extends Component {
  constructor(props) {
    super(props)
    this.getModulesFromStudent = this.getModulesFromStudent.bind(this)
    this.sendEditedGradeInfo = this.sendEditedGradeInfo.bind(this)
  }

  componentDidMount() {
    this.props.getAllStudents()
  }

  getModulesFromStudent(_studentID) {
    console.log(_studentID)
    this.props.getEnrolledModules(_studentID)
  }

  sendEditedGradeInfo(_moduleID, _studentID, _newGrade) {
    this.props.assignStudentGrade(_moduleID, _studentID, _newGrade)
  }

  render() {
    return (
      <div className="backgroundDiv">
        <Screen
          getModulesForStudent={this.getModulesFromStudent}
          sendEditedGradeInfo={this.sendEditedGradeInfo}
        />
      </div>
    )
  }
}

export default connect(null, actions)(EditGradesScreen)
