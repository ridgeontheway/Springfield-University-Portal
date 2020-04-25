import React, { Component } from 'react'
import { connect } from 'react-redux'
import ErrorRedirectButton from '../../components/errorRedirectButton'
import Title from '../../components/title'
import Description from '../../components/description'
import * as actions from '../../actions'
import '../styles.css'
class ErrorScreen extends Component {
  componentDidMount() {
    this.props.resetError()
  }
  render() {
    return (
      <div className="backgroundDiv">
        <div className="loginDiv">
          <div className="wrapperDiv">
            <div className="titleDiv">
              <Title text="Error" />
              <Description text="An issue occurred with your request. Please contact an administrator" />
            </div>
            <div className="footerDiv">
              <ErrorRedirectButton />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default connect(null, actions)(ErrorScreen)
