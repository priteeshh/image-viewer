import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';


class Home extends Component {
    logoutHandler = () => {
        this.props.history.push("/");
    }
    profilePageHandler = () => {
        this.props.history.push("/profile");
    }
    render() {
        return (
            <div>
                <Header page="home" logoClass = "app-logo-home" clickLogout={this.logoutHandler} clickProfile={this.profilePageHandler}></Header>
                <div className="container">
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>
                </div>
            </div>
        )
    }
}
export default Home;