import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'

class Login extends Component {
    render(){
        return(
            <div>
                <Header searchBarEnable = "true"></Header>
            </div>
        )
    }
}
export default Login;