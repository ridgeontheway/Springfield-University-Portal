import React, { Component } from 'react'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import DashboardButton from '../../components/dashboardButton'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userFirstName: null,
      userSurname: null,
      userGender: null,
      userEmail: null,
      userPhoneNumber: null,
      userNationality: null
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (
      props.userInfo &&
      props.userInfo['name'] !== state.userFirstName &&
      props.userInfo['surname'] !== state.userSurname &&
      props.userInfo['email'] !== state.userEmail
    ) {
      return {
        userFirstName: props.userInfo['name'],
        userSurname: props.userInfo['surname'],
        userEmail: props.userInfo['email'],
        userGender: props.userInfo['gender'],
        userPhoneNumber: props.userInfo['phone_number'],
        userNationality: props.userInfo['nationality']
      }
    }
    return null
  }

  showStudentInformation() {
    return (
      <div className="info__wrap">
        <div className="student__info">
          <p className="attribute__title top__element">Fist Name:</p>
          <p className="attribute__style top__element">
            {this.state.userFirstName}
          </p>
        </div>
        <div className="student__info">
          <p className="attribute__title">Surname:</p>
          <p className="attribute__style">{this.state.userSurname}</p>
        </div>
        <div className="student__info">
          <p className="attribute__title">Gender:</p>
          <p className="attribute__style">{this.state.userGender}</p>
        </div>
        <div className="student__info">
          <p className="attribute__title">Phone Number:</p>
          <p className="attribute__style">{this.state.userPhoneNumber}</p>
        </div>
        <div className="student__info">
          <p className="attribute__title">Nationality:</p>
          <p className="attribute__style">{this.state.userNationality}</p>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="My Account Information" />
            <Description text="University of Springfield Staff and Student Services" />
          </div>
          <div>
            {this.state.userFirstName && this.state.userSurname ? (
              this.showStudentInformation()
            ) : (
              <h1>Waiting.......</h1>
            )}
          </div>
          <div className="footerDiv">
            <DashboardButton />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo
  }
}

export default connect(mapStateToProps)(Screen)
