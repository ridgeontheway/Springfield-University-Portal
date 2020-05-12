import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import ModuleGradeCard from '../../components/card/module-grade'
import StudentCard from '../../components/card/student'
import EditStudentGradePopup from '../../components/popUp/edit-student-grade'
import DashboardButton from '../../components/dashboardButton'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: false,
      selectedStudentID: 0,
      studentModules: false,
      moduleNameToEdit: '',
      moduleIDToEdit: 0,
      showUserPopUp: false
    }
    this.moreInfoPressed = this.moreInfoPressed.bind(this)
    this.openModuleEditPopup = this.openModuleEditPopup.bind(this)
  }

  componentDidMount() {
    this.setState({ studentModules: false, showUserPopUp: false })
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.students && props.students !== state.students) {
      return {
        students: props.students
      }
    } else if (
      props.studentModules &&
      props.studentModules != state.studentModules
    ) {
      return {
        students: false,
        studentModules: props.studentModules,
        showUserPopUp: false
      }
    }
    return null
  }

  moreInfoPressed(_studentID) {
    this.setState({ selectedStudentID: _studentID })
    this.props.getModulesForStudent(_studentID)
  }

  openModuleEditPopup(_moduleID, _moduleName) {
    this.setState({
      moduleIDToEdit: _moduleID,
      moduleNameToEdit: _moduleName,
      showUserPopUp: true
    })
  }

  renderContent() {
    if (this.state.students) {
      return this.renderStudents()
    } else {
      return this.renderModulesForSpecificStudent()
    }
  }

  renderModulesForSpecificStudent() {
    if (this.state.studentModules) {
      const data = this.state.studentModules
      return (
        <div>
          {data.map((data, idx) => {
            return (
              <ModuleGradeCard
                key={idx}
                name={data.name}
                module_id={data.module_id}
                grade={data.grade}
                onClick={this.openModuleEditPopup}
              />
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }

  renderStudents() {
    if (this.state.students) {
      const data = this.state.students
      return (
        <div>
          {data.map((data, idx) => {
            return (
              <StudentCard
                key={idx}
                first_name={data.name}
                last_name={data.surname}
                student_id={data.id}
                onClick={this.moreInfoPressed}
              />
            )
          })}
        </div>
      )
    } else {
      return null
    }
  }

  render() {
    return (
      <div>
        <div className="loginDiv">
          <div className="wrapperDiv">
            <div className="titleDiv">
              <Title text="Available Modules" />
              <Description text="University of Springfield Staff and Student Services" />
            </div>
            <div className="module__wrapper">
              {this.state.students || this.state.studentModules ? (
                this.renderContent()
              ) : (
                <h1>Waiting.......</h1>
              )}
            </div>
            <div className="footerDiv">
              <DashboardButton />
            </div>
          </div>
          <EditStudentGradePopup
            show={this.state.showUserPopUp}
            title="Edit Student Grade"
            send_edited_info={this.props.sendEditedGradeInfo}
            module_title={this.state.moduleNameToEdit}
            module_id={this.state.moduleIDToEdit}
            student_id={this.state.selectedStudentID}
            onHide={() => this.togglePopUp(false)}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    students: state.students,
    studentModules: state.enrolledModules
  }
}

Screen.propTypes = {
  getModulesForStudent: PropTypes.func.isRequired,
  sendEditedGradeInfo: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
