import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actions from '../../actions'
import Screen from './Screen'
import '../styles.css'
class MyModulesScreen extends Component {
  constructor(props) {
    super(props)
    this.removeModule = this.removeModule.bind(this)
    this.state = {
      APIError: false
    }
  }
  componentDidMount() {
    this.props.getEnrolledModules()
  }

  removeModule(_moduleID) {
    this.props.unenrollStudentFromModule(_moduleID)
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
      return <Screen removeStudentFromModule={this.removeModule} />
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

export default connect(mapStateToProps, actions)(MyModulesScreen)
