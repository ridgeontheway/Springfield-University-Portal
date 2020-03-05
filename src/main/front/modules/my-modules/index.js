import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class MyModulesScreen extends Component {
  constructor(props) {
    super(props)
    this.removeModule = this.removeModule.bind(this)
  }
  componentDidMount() {
    this.props.getEnrolledModules()
  }

  removeModule(_moduleID) {
    this.props.unenrollStudentFromModule(_moduleID)
  }

  render() {
    return (
      <div className="backgroundDiv">
        <Screen removeStudentFromModule={this.removeModule} />
      </div>
    )
  }
}

export default connect(null, actions)(MyModulesScreen)
