import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Title from '../../components/title'
import Description from '../../components/description'
import ModuleCard from '../../components/card/module'
import EditModulePopup from '../../components/popUp/edit-module'
import '../styles.css'
import './styles.css'
class Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modules: false,
      showUserPopUp: false,
      selectedModuleName: '',
      selectedModuleID: 0,
      selectedModuleCoordinator: ''
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

  moreInfoPressed(_name, _moduleID, _moduleCoordinator) {
    this.setState({
      selectedModuleName: _name,
      selectedModuleID: _moduleID,
      selectedModuleCoordinator: _moduleCoordinator,
      showUserPopUp: true
    })
  }

  updateInfo() {
    console.log('hello?')
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
            <Title text="Edit Modules" />
            <Description text="University of Springfield Staff and Student Services" />
          </div>
          <div className="edit-student-content__wrapper">
            {this.state.modules ? (
              this.renderModules()
            ) : (
              <h1>Waiting.......</h1>
            )}
          </div>
          <div className="footerDiv" />
        </div>
        <EditModulePopup
          show={this.state.showUserPopUp}
          title="Edit Module Information"
          send_edited_info={this.props.editModuleDetails}
          module_title={this.state.selectedModuleName}
          coordinator={this.state.selectedModuleCoordinator}
          id={this.state.selectedModuleID}
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
  editModuleDetails: PropTypes.func.isRequired
}

export default connect(mapStateToProps)(Screen)
