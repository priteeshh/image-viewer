import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';


class Home extends Component {
    logoutHandler = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <div>
                <Header searchBarEnable="true" clickLogout={this.logoutHandler}></Header>
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