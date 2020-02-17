import React, { Component } from "react"
import LoginForm from '../../Components/LoginForm'
import Title from '../../Components/Title'
import TitleDescription from '../../Components/TitleDescription'
import CreateUser from '../../Components/CreateUser'
import './styles.css'

export default class Screen extends Component {
    render() {
        return (
            <div className='loginDiv'>
                <div className='wrapperDiv'>
                    <div className='titleDiv'>
                        <Title/>
                        <TitleDescription />
                    </div>
                    <LoginForm />
                    <div className='footerDiv'>
                        <CreateUser />
                    </div>
                </div>
            </div>
        )
    }
}