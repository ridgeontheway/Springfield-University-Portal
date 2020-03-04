import React, { Component } from 'react'
import { connect } from 'react-redux'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class EditStudentModulesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderData: null
    }
    this.editModuleDetails = this.editModuleDetails.bind(this)
  }

  editModuleDetails(_moduleID, _coordinator, _title) {
    this.props.editModuleDetails(_moduleID, _coordinator, _title)
  }

  componentDidMount() {
    this.props.getAllModules()
  }
  render() {
    return (
      <div className="backgroundDiv">
        <Screen editModuleDetails={this.editModuleDetails} />
      </div>
    )
  }
}

export default connect(null, actions)(EditStudentModulesScreen)
