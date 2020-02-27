import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AvailableModulesCardComponent from '../../components/card/available-modules'
import MyModulesCardComponent from '../../components/card/my-modules'
import SchoolStatsCardComponent from '../../components/card/school-stats'
import Title from '../../components/title'
import Description from '../../components/description'
import '../styles.css'
import './styles.css'
export default class Screen extends Component {
  render() {
    return (
      <div className="loginDiv">
        <div className="wrapperDiv">
          <div className="titleDiv">
            <Title text="University of Springfield" />
            <Description text="Staff and Student Services" />
          </div>
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
              text={this.props.myModulesText}
              onClick={this.props.schoolStatsOnClick}
            />
          </div>
          <div className="footerDiv" />
        </div>
      </div>
    )
  }
}
