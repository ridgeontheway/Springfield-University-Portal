import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

// just going to call the api endpoint for gender, then the
class AnalyticsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderData: null,
      APIError: false
    }
  }
  componentDidMount() {
    this.props.getNationalityAnalytics()
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

export default connect(mapStateToProps, actions)(AnalyticsScreen)
