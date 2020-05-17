import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaSignOutAlt } from 'react-icons/fa'
import { CARD_ICON_SIZE } from '../../constants/icon-size'
import { PORT_NUMBER } from '../../constants/api-calls'
import './styles.css'

export default class LogoutButton extends Component {
  render() {
    const redirectURL = 'https://localhost:' + PORT_NUMBER
    return (
      <a href={redirectURL}>
        <Button variant="primary" type="submit" className="info-button__theme">
          <div className="button__wrap">
            <div className="icon__wrap">
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: CARD_ICON_SIZE
                }}>
                <div>
                  <FaSignOutAlt />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">Logout</p>
            </div>
          </div>
        </Button>
      </a>
    )
  }
}
