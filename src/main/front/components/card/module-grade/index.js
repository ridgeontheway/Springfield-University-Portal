import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { IconContext } from 'react-icons'
import { FaEdit } from 'react-icons/fa'
import { CARD_ICON_SIZE } from '../../../constants/icon-size'
import './styles.css'
import '../styles.css'
export default class ModuleGradeCard extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }
  onPress() {
    this.props.onClick(this.props.module_id, this.props.name)
  }

  printGrade() {
    const displayedGrade = this.props.grade ? this.props.grade : 'NA'
    return displayedGrade
  }

  render() {
    return (
      <Card onClick={this.onPress}>
        <Card.Body className="card__body">
          <div className="card__wrap">
            <div className="text__wrap">
              <div>
                <p className="title__theme">{this.props.name}</p>
              </div>
              <div>
                <p className="text__theme">
                  Current Grade: {this.printGrade()}
                </p>
              </div>
            </div>
            <div>
              <IconContext.Provider
                value={{
                  color: 'black',
                  size: CARD_ICON_SIZE
                }}>
                <div>
                  <FaEdit />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

ModuleGradeCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  module_id: PropTypes.number.isRequired,
  grade: PropTypes.string.isRequired
}
