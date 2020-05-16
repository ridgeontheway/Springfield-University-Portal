import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AvailableModulesCardComponent from '../../components/card/available-modules'
import MyModulesCardComponent from '../../components/card/my-modules'
import SchoolStatsCardComponent from '../../components/card/school-stats'
import EditModulesCardComponent from '../../components/card/edit-modules'
import AssignGradeCardComponent from '../../components/card/assign-grades'
import MyInfoCardComponent from '../../components/card/my-info'
import Title from '../../components/title'
import Description from '../../components/description'
import '../styles.css'
import './styles.css'
export default class Screen extends Component {
  renderContentBasedOnRole() {
    if (this.props.userRole === 'staff') {
      return (
        <div className="card__spacing">
          <EditModulesCardComponent
            text={this.props.editModulesText}
            onClick={this.props.editModulesOnClick}
          />
          <AssignGradeCardComponent
            text={this.props.assignGradesTest}
            onClick={this.props.assignGradesOnClick}
          />
        </div>
      )
    } else {
      return (
        <div className="card__spacing">
          <AvailableModulesCardComponent
            text={this.props.viewAvailableModulesText}
            onClick={this.props.availableModulesOnClick}
          />
          <MyModulesCardComponent
            text={this.props.myModulesText}
            onClick={this.props.myModulesOnClick}
          />
          <SchoolStatsCardComponent
            text={this.props.schoolStatsText}
            onClick={this.props.schoolStatsOnClick}
          />
          <MyInfoCardComponent
            text={this.props.myInfoText}
            onClick={this.props.myInfoOnClick}
          />
        </div>
      )
    }
  }

  render() {
    return (
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="University of Springfield" />
            <Description text="Staff and Student Services" />
          </div>
          <div>{this.renderContentBasedOnRole()}</div>
          <div className="footerDiv" />
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  viewAvailableModulesText: PropTypes.string.isRequired,
  availableModulesOnClick: PropTypes.func.isRequired,
  myModulesText: PropTypes.string.isRequired,
  myModulesOnClick: PropTypes.func.isRequired,
  schoolStatsText: PropTypes.string.isRequired,
  schoolStatsOnClick: PropTypes.func.isRequired,
  editModulesText: PropTypes.string.isRequired,
  editModulesOnClick: PropTypes.func.isRequired,
  assignGradesTest: PropTypes.string.isRequired,
  assignGradesOnClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  myInfoText: PropTypes.string.isRequired,
  myInfoOnClick: PropTypes.func.isRequired
}
