import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import LoginScreen from '../Modules/Login'

class App extends Component {
    render() {
        return (
            <LoginScreen/>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('react')
)