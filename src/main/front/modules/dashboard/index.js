import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Screen from './Screen'
import '../styles.css'
export default class DashboardScreen extends Component {
  render() {
    return (
      <div className="backgroundDiv">
        <Screen
          viewAvailableModulesText="View Available Modules"
          myModulesText="My Modules"
          schoolStatsText="View School Statistics"
          availableModulesOnClick={this.props.availableModulesOnClick}
          myModulesOnClick={this.props.myModulesOnClick}
          schoolStatsOnClick={this.props.schoolStatsOnClick}
        />
      </div>
    )
  }
}
