import React, { Component } from 'react'
import { connect } from 'react-redux'
import Screen from './Screen'
import * as actions from '../../actions'
import '../styles.css'

// just going to call the api endpoint for gender, then the
class AnalyticsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genderData: null
    }
  }
  componentDidMount() {
    this.props.getNationalityAnalytics()
  }
  render() {
    return (
      <div className="backgroundDiv">
        <Screen />
      </div>
    )
  }
}

export default connect(null, actions)(AnalyticsScreen)
