import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NewUserPopup from '../../components/popUp/new-user'
import Title from '../../components/title'
import Description from '../../components/description'
import NewUserForm from '../../components/form/newUser'
import '../styles.css'

class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userEmail: 0,
      userPassword: '',
      showUserPopUp: false
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.user && props.user['email'] !== state.userEmail) {
      return {
        userEmail: props.user['email'],
        userPassword: props.user['password'],
        showUserPopUp: true
      }
    }
    // Return null to indicate no change to state.
    return null
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show })
    this.props.OnUserRegistrationComplete()
  }

  render() {
    return (
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="University of Springfield" />
            <Description text="Staff and Student Services" />
          </div>
          <NewUserForm
            handleOnMissingData={this.props.OnMissingData}
            handleOnDataSubmission={this.props.OnFormDataSubmission}
          />
          <div className="footerDiv" />
        </div>
        <NewUserPopup
          show={this.state.showUserPopUp}
          title="Welcome to Springfield University"
          email={this.state.userEmail}
          onHide={() => this.togglePopUp(false)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log('this is the state = ')
  console.log(state)
  return {
    user: state.user
  }
}

Screen.propTypes = {
  OnMissingData: PropTypes.func.isRequired,
  OnFormDataSubmission: PropTypes.func.isRequired,
  OnUserRegistrationComplete: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
