import React, { Component } from "react";
import './styles.css'

export default class CreateUser extends Component {
    constructor() {
        super()
        this.state = { title: 'Create Account'}
    }

    onPress() {
        this.setState= { title: 'Account Created!'}
    }


    render() {
        return (
            // TODO: issue with onClick
            <div onClick={this.onPress}>
                <h1 className='createUser'>{this.state.title}</h1>
            </div>
        )
    }
}