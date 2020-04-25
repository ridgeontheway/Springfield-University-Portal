import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import { IconContext } from 'react-icons'
import { FaHome } from 'react-icons/fa'
import { CARD_ICON_SIZE } from '../../constants/icon-size'
import { Redirect } from 'react-router-dom'
import './styles.css'

export default class DashboardButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.redirectBasedOnClick = this.redirectBasedOnClick.bind(this)
  }
  redirectBasedOnClick() {
    this.setState({ redirect: true })
  }

  renderComponentBasedOnState() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/dashboard'
          }}
        />
      )
    } else {
      return (
        <Button
          variant="primary"
          type="submit"
          className="info-button__theme"
          onClick={this.redirectBasedOnClick}>
          <div className="button__wrap">
            <div className="icon__wrap">
              <IconContext.Provider
                value={{
                  color: 'white',
                  size: CARD_ICON_SIZE
                }}>
                <div>
                  <FaHome />
                </div>
              </IconContext.Provider>
            </div>
            <div>
              <p className="text__body">Dashboard</p>
            </div>
          </div>
        </Button>
      )
    }
  }
  render() {
    return <div>{this.renderComponentBasedOnState()}</div>
  }
}
