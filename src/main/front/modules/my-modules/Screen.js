import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import ModuleCard from '../../components/card/module'
import ToastComponent from '../../components/toast'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: null,
      showToast: false,
      toastText: ''
    }
    this.moreInfoPressed = this.moreInfoPressed.bind(this)
    this.togglePopUp = this.togglePopUp.bind(this)
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show })
  }

  moreInfoPressed(_name, _moduleID) {
    const userText = 'You have un-enrolled from the module: ' + _name
    this.setState({ toastText: userText, showToast: true, modules: [] })
    this.props.removeStudentFromModule(_moduleID)
    setTimeout(() => {
      this.setState({ showToast: false })
    }, 2000)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modules) {
      return {
        modules: props.modules
      }
    } else if (!props.modules) {
      return {
        modules: []
      }
    }
    return null
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
                type="Enrolled"
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
              show={this.state.showToast}
              onClose={() => this.togglePopUp(false)}
              text={this.state.toastText}
            />
          </div>
        </div>
        <div className="loginDiv">
          <div className="wrapperDiv">
            <div className="titleDiv">
              <Title text="My Modules" />
              <Description text="University of Springfield Staff and Student Services" />
            </div>
            <div className="myModules__wrapper">
              {this.state.modules ? (
                this.renderModules()
              ) : (
                <h1>You have no modules</h1>
              )}
            </div>
            <div className="footerDiv" />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modules: state.enrolledModules
  }
}

Screen.propTypes = {
  removeStudentFromModule: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
