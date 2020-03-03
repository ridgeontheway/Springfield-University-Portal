import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class MyModulesScreen extends Component {
  componentDidMount() {
    this.props.getEnrolledModules()
  }

  render() {
    return (
      <div className="backgroundDiv">
        <Screen />
      </div>
    )
  }
}

export default connect(null, actions)(MyModulesScreen)
