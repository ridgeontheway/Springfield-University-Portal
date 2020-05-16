import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

// just going to call the api endpoint for gender, then the
class MyInfoScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      APIError: false
    }
  }
  componentDidMount() {
    this.props.getLoggedInStudentInfo()
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error && props.error != state.APIError) {
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
      return <Screen />
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

export default connect(mapStateToProps, actions)(MyInfoScreen)
