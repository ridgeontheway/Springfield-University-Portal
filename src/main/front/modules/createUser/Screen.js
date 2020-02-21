import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Title from '../../components/title'
import Description from '../../components/description'
import NewUserForm from '../../components/form/newUser'
import '../styles.css'

export default class Screen extends Component {
  render () {
    return (
      <div className='loginDiv'>
        <div className='wrapperDiv'>
          <div className='titleDiv'>
            <Title text='University of Springfield' />
            <Description text='Staff and Student Services' />
          </div>
          <NewUserForm handleOnMissingData={this.props.OnMissingData} />
          <div className='footerDiv' />
        </div>
      </div>
    )
  }
}

Screen.propTypes = {
  OnMissingData: PropTypes.func.isRequired
}
