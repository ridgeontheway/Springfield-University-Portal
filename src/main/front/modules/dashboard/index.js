import React, { Component } from 'react'
import Screen from './Screen'
import '../styles.css'
export default class DashboardScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      pathname: '/dashboard'
    }
    this.onAvailableModules = this.onAvailableModules.bind(this)
    this.onMyModules = this.onMyModules.bind(this)
    this.onSchoolStats = this.onSchoolStats.bind(this)
  }

  onAvailableModules() {
    this.setState({ redirect: true, pathname: '/availableModules' })
  }

  onMyModules() {
    this.setState({ redirect: true, pathname: '/my-modules' })
  }

  onSchoolStats() {
    this.setState({ redirect: true, pathname: '/school-stats' })
  }

  render() {
    return (
      <div className="backgroundDiv">
        {this.state.redirect ? (
          <Redirect
            push
            to={{
              pathname: this.state.pathname
            }}
          />
        ) : (
          <Screen
            viewAvailableModulesText="View Available Modules"
            myModulesText="My Modules"
            schoolStatsText="View School Statistics"
            availableModulesOnClick={this.props.availableModulesOnClick}
            myModulesOnClick={this.props.myModulesOnClick}
            schoolStatsOnClick={this.props.schoolStatsOnClick}
          />
        )}
      </div>
    )
  }
}
