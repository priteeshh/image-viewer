import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header'


class Profile extends Component {
    logoutHandler = () => {
        this.props.history.push("/");
    }
    homeHandler = (e) => {
        this.props.history.push("/home");
    }
    render() {
        return (
            <div>
                <Header page="profile" logoClass = "app-logo-profile" clickLogout={this.logoutHandler} clickHome={this.homeHandler}></Header>
            </div>
        )
    }
}
export default Profile;