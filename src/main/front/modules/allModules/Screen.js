import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import ModuleCard from '../../components/card/module'
import ModuleRegistrationPopup from '../../components/popUp/module-registration'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: false,
      showUserPopUp: false
    }
    this.moreInfoPressed = this.moreInfoPressed.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.modules && props.modules !== state.modules) {
      return {
        modules: props.modules
      }
    }
    return null
  }

  togglePopUp(show) {
    this.setState({ showUserPopUp: show })
  }

  moreInfoPressed(_name, _moduleID) {
    this.props.processCourseInfo(_name)
    this.setState({ showUserPopUp: true })
  }

  renderModules() {
    if (this.state.modules) {
      const data = this.state.modules
      console.log(data)
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
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="Available Modules" />
            <Description text="University of Springfield Staff and Student Services" />
          </div>
          <div className="content__wrapper">
            {this.state.modules ? (
              this.renderModules()
            ) : (
              <h1>Waiting.......</h1>
            )}
          </div>
          <div className="footerDiv" />
        </div>
        <ModuleRegistrationPopup
          show={this.state.showUserPopUp}
          title="Module Registration"
          register={this.props.processPayment}
          onHide={() => this.togglePopUp(false)}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    modules: state.modules
  }
}

Screen.propTypes = {
  processCourseInfo: PropTypes.func.isRequired,
  processPayment: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
