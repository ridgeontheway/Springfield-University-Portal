import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

class AllModulesScreen extends Component {
  constructor() {
    super()
    this.processCourseInfo = this.processCourseInfo.bind(this)
    this.state = {
      APIError: false
    }
  }

  componentDidMount() {
    this.props.getAllModules()
  }

  processCourseInfo(_courseID) {
    this.props.enrolInModule(_courseID)
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
      return <Screen processCourseInfo={this.processCourseInfo} />
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

export default connect(mapStateToProps, actions)(AllModulesScreen)
