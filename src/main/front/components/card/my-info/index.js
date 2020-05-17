import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import { IconContext } from 'react-icons'
import { FaArrowRight, FaQuestionCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'
import { CARD_ICON_SIZE } from '../../../constants/icon-size'
import '../styles.css'

export default class MyInfoCardComponent extends Component {
  render() {
    return (
      <Card onClick={this.props.onClick}>
        <Card.Body className="card__body">
          <div className="card__wrap">
            <div>
              <IconContext.Provider
                value={{
                  color: 'black',
                  size: CARD_ICON_SIZE
                }}>
                <div>
                  <FaQuestionCircle />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">{this.props.text}</p>
            </div>
            <div>
              <FaArrowRight />
            </div>
          </div>
        </Card.Body>
      </Card>
    )
  }
}
