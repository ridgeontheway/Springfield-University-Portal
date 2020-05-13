import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class EditStudentModulesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderData: null,
      APIError: false
    }
    this.editModuleDetails = this.editModuleDetails.bind(this)
  }

  editModuleDetails(_moduleID, _coordinator, _title) {
    this.props.editModuleDetails(_moduleID, _coordinator, _title)
  }

  componentDidMount() {
    this.props.getAllModules()
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
      return <Screen editModuleDetails={this.editModuleDetails} />
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

export default connect(mapStateToProps, actions)(EditStudentModulesScreen)
