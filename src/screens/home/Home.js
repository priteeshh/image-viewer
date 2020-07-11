import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'

class Login extends Component {
    logoutHandler = () => {
        this.props.history.push("/");
    }
    render(){
        return(
            <div>
                <Header searchBarEnable = "true" clickLogout = {this.logoutHandler}></Header>
            </div>
        )
    }
}
export default Login;