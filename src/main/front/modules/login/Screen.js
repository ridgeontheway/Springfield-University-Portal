import React, { Component } from 'react'
import LoginForm from '../../components/form/login'
import Title from '../../components/title'
import Description from '../../components/description'
import FooterText from '../../components/footerText'
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
          <LoginForm />
          <div className='footerDiv'>
            <FooterText />
          </div>
        </div>
      </div>
    )
  }
}
