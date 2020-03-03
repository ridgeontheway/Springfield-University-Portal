import React, { Component } from 'react'
import Screen from './Screen'
import '../styles.css'
export default class MyModulesScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      pathname: '/my-modules'
    }
  }

  render() {
    return <Screen />
  }
}
