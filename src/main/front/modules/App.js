import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateUserScreen from './createUser'
import AllModulesScreen from './allModules'
import LoginScreen from './login'
import DashboardScreen from './dashboard'
import MyModulesScreen from './my-modules'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userRegistered: false
    }
    this.userRegistrationCompleted = this.userRegistrationCompleted.bind(this)
    this.userRegistrationUnFinished = this.userRegistrationUnFinished.bind(this)
  }

  userRegistrationCompleted() {
    this.setState({ userRegistered: true })
  }

  userRegistrationUnFinished() {
    this.setState({ userRegistered: false })
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LoginScreen} />
          <Route path="/new-user" component={CreateUserScreen} />
          <Route path="/dashboard" component={DashboardScreen} />
          <Route path="/all-modules" component={AllModulesScreen} />
          <Route path="/my-modules" component={MyModulesScreen} />
        </Switch>
      </Router>
    )
  }
}
