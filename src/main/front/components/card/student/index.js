import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import { IconContext } from 'react-icons'
import { FaInfoCircle } from 'react-icons/fa'
import { CARD_ICON_SIZE } from '../../../constants/icon-size'

import './styles.css'
import '../styles.css'
export default class StudentCard extends Component {
  constructor(props) {
    super(props)
    this.onPress = this.onPress.bind(this)
  }
  onPress() {
    this.props.onClick(this.props.student_id)
  }
  render() {
    return (
      <Card onClick={this.onPress}>
        <Card.Body className="card__body">
          <div className="card__wrap">
            <div className="text__wrap">
              <div>
                <p className="title__theme">{this.props.first_name}</p>
              </div>
              <div>
                <p className="text__theme">{this.props.last_name}</p>
              </div>
            </div>
            <div>
              <IconContext.Provider
                value={{
                  color: 'black',
                  size: CARD_ICON_SIZE
                }}>
                <div>
                  <FaInfoCircle />
                </div>
              </IconContext.Provider>
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}

StudentCard.propTypes = {
  onClick: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  student_id: PropTypes.number.isRequired
}
