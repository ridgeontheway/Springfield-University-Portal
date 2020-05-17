import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import * as actions from '../../actions'
import LoginForm from '../../components/form/login'
import Title from '../../components/title'
import Description from '../../components/description'
import FooterText from '../../components/footerText'
import ToastComponent from '../../components/toast'
import '../styles.css'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showUserPopUp: false,
      toastText: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.error) {
      props.resetLoginError()
      return {
        showUserPopUp: true,
        toastText: 'Invalid Username/Password Combination entered'
      }
    }
    return null
  }
  render() {
    return (
      <div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'relative',
            minHeight: '200px'
          }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0
            }}>
            <ToastComponent
              show={this.state.showUserPopUp}
              text={this.state.toastText}
              onClose={() => this.setState({ showUserPopUp: false })}
            />
          </div>
        </div>
        <div className="loginDiv">
          <div className="wrapperDiv">
            <div className="titleDiv">
              <Title text="University of Springfield" />
              <Description text="Staff and Student Services" />
            </div>
            <LoginForm
              handleOnClick={this.props.onLoginPressed}
              handleOnMissingData={this.props.handleOnMissingData}
            />
            <div className="footerDiv">
              <FooterText onClick={this.props.onNewUser} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    error: state.invalidLogIn
  }
}

export default connect(mapStateToProps, actions)(Screen)

Screen.propTypes = {
  onNewUser: PropTypes.func.isRequired,
  onLoginPressed: PropTypes.func.isRequired,
  handleOnMissingData: PropTypes.func.isRequired
}
