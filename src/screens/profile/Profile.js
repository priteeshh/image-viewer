import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header'


class Profile extends Component {
    logoutHandler = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <Header searchBarEnable="true" searchEnable="false" clickLogout={this.logoutHandler}></Header>
            </div>
        )
    }
}
export default Profile;