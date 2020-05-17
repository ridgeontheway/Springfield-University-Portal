import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import ModuleCard from '../../components/card/module'
import ToastComponent from '../../components/toast'
import DashboardButton from '../../components/dashboardButton'
import * as actions from '../../actions'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: false,
      showUserPopUp: false,
      toastText: null
    }
    this.moreInfoPressed = this.moreInfoPressed.bind(this)
  }

  componentDidMount() {
    this.setState({ showUserPopUp: false, modules: false })
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modules && props.modules !== state.modules) {
      return {
        modules: props.modules
      }
    } else if (
      props.modules &&
      props.modules !== state.modules &&
      !props.payment
    ) {
      return {
        modules: props.modules
      }
    } else if (props.payment) {
      props.resetEnrolment()
      if (props.payment === 'enrolled') {
        return {
          showUserPopUp: true,
          toastText: props.payment
        }
      } else {
        return {
          showUserPopUp: true,
          toastText: 'You have insufficient funds to enrol in this module'
        }
      }
    }
    return null
  }

  moreInfoPressed(_name, _moduleID) {
    this.props.processCourseInfo(_moduleID)
    setTimeout(() => {
      this.setState({ showUserPopUp: false })
    }, 2000)
  }

  renderModules() {
    if (this.state.modules) {
      const data = this.state.modules
      return (
        <div>
          {data.map((data, idx) => {
            return (
              <ModuleCard
                key={idx}
                name={data.name}
                coordinator={data.coordinator_name}
                moduleID={data.module_id}
                onClick={this.moreInfoPressed}
                type="Available"
              />
            )
          })}
        </div>
      )
    } else {
      return null
    }
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
              <Title text="Available Modules" />
              <Description text="University of Springfield Staff and Student Services" />
            </div>
            <div className="module__wrapper">
              {this.state.modules ? (
                this.renderModules()
              ) : (
                <h1>Waiting.......</h1>
              )}
            </div>
            <div className="footerDiv">
              <DashboardButton />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modules: state.modules,
    payment: state.payment
  }
}

Screen.propTypes = {
  processCourseInfo: PropTypes.func.isRequired
}

export default connect(mapStateToProps, actions)(Screen)
