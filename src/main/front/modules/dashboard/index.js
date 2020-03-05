import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class DashboardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      pathname: '/dashboard',
      userRole: ''
    }
    this.onAvailableModules = this.onAvailableModules.bind(this)
    this.onMyModules = this.onMyModules.bind(this)
    this.onSchoolStats = this.onSchoolStats.bind(this)
    this.onEditModules = this.onEditModules.bind(this)
    this.onAssignGrades = this.onAssignGrades.bind(this)
  }

  componentDidMount() {
    this.props.getLoggedInUser()
  }

  static getDerivedStateFromProps(props, state) {
    console.log('props', props)
    console.log('state', state)
    if (props.currentUser) {
      return {
        userRole: props.currentUser['user_role']
      }
    }
    return null
  }

  onAvailableModules() {
    this.setState({ redirect: true, pathname: '/all-modules' })
  }

  onMyModules() {
    this.setState({ redirect: true, pathname: '/my-modules' })
  }

  onSchoolStats() {
    this.setState({ redirect: true, pathname: '/school-stats' })
  }

  onEditModules() {
    this.setState({ redirect: true, pathname: '/admin/edit-modules' })
  }

  onAssignGrades() {
    this.setState({ redirect: true, pathname: '/admin/assign-grades' })
  }

  renderComponentsBasedOnState() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: this.state.pathname
          }}
        />
      )
    } else if (this.state.userRole) {
      return (
        <Screen
          viewAvailableModulesText="View Available Modules"
          myModulesText="My Modules"
          schoolStatsText="View School Statistics"
          availableModulesOnClick={this.onAvailableModules}
          myModulesOnClick={this.onMyModules}
          schoolStatsOnClick={this.onSchoolStats}
          editModulesText="Edit Student Modules"
          editModulesOnClick={this.onEditModules}
          assignGradesTest="Assign Grades"
          assignGradesOnClick={this.onAssignGrades}
          userRole={this.state.userRole}
        />
      )
    } else {
      return <h1>Waiting on user information....</h1>
    }
  }

  render() {
    return (
      <div className="backgroundDiv">{this.renderComponentsBasedOnState()}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, actions)(DashboardScreen)
