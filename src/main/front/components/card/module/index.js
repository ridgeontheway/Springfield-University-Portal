import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { IconContext } from 'react-icons'
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'
import { CARD_ICON_SIZE } from '../../../constants/icon-size'

import './styles.css'
import '../styles.css'
export default class ModuleCard extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }
  onPress() {
    console.log('this is the props = ', this.props)
    this.props.onClick(this.props.name, this.props.moduleID)
  }
  renderAvailableOrPersonalModules() {
    if (this.props.type === 'Available') {
      return (
        <Card onClick={this.onPress}>
          <Card.Body className="card__body">
            <div className="card__wrap">
              <div className="text__wrap">
                <div>
                  <p className="title__theme">{this.props.name}</p>
                </div>
                <div>
                  <p className="text__theme">{this.props.coordinator}</p>
                </div>
              </div>
              <div>
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: CARD_ICON_SIZE
                  }}>
                  <div>
                    <FaPlusCircle />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </Card.Body>
        </Card>
      )
    } else {
      return (
        <Card onClick={this.onPress}>
          <Card.Body className="card__body">
            <div className="card__wrap">
              <div className="text__wrap">
                <div>
                  <p className="title__theme">{this.props.name}</p>
                </div>
                <div>
                  <p className="text__theme">{this.props.coordinator}</p>
                </div>
              </div>
              <div>
                <IconContext.Provider
                  value={{
                    color: 'black',
                    size: CARD_ICON_SIZE
                  }}>
                  <div>
                    <FaTrashAlt />
                  </div>
                </IconContext.Provider>
              </div>
            </div>
          </Card.Body>
        </Card>
      )
    }
  }
  render() {
    return this.renderAvailableOrPersonalModules()
  }
}

ModuleCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  coordinator: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  moduleID: PropTypes.number.isRequired
}
