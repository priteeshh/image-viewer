import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            images: []
        };
    }
    logoutHandler = () => {
        this.props.history.push("/");
    }
    profilePageHandler = () => {
        this.props.history.push("/profile");
    }
    componentDidMount() {
        let thisComponent = this;
        let xhrUserData = new XMLHttpRequest();
        //Instagram API for a logged in user to fetch user details
        xhrUserData.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let responseData = this.response;
                console.log(responseData);
            } 
        });
        //Get Request for API
        xhrUserData.open('GET', 'https://graph.instagram.com/me?fields=id,username,media_count,account_type&access_token=IGQVJYcXNneUpFbFNRZAVIwTXBvdUVoaUJ2aldHVzVIcXQxa2pqenFxTUFmX3UxMnh4OUJ0bm9feG5hQjVuSTVmYUZA4bGhOcGF1T3RsUmlhZADB4SDZAuN3hMMUdSRlp3RnZAfbFNKWVJvYXZANNmM2Y2dsTwZDZD');
        xhrUserData.send();

        let xhrImageData = new XMLHttpRequest();
        var images = [];
        xhrImageData.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let responseData = JSON.parse(this.response).data;
                 console.log(responseData);
                responseData.forEach(imageDetails => {
                    images.push({
                        id: imageDetails.id,
                        media_url: imageDetails.media_url,
                        username: imageDetails.username,
                        timestamp: imageDetails.timestamp,
                        caption: imageDetails.caption
                    });
                });
                thisComponent.setState({ images: images })
            }
        });
        //Get Request for Media
        xhrImageData.open('GET', 'https://graph.instagram.com/me/media?fields=id,media_type,media_url,username,caption,timestamp&access_token=IGQVJYcXNneUpFbFNRZAVIwTXBvdUVoaUJ2aldHVzVIcXQxa2pqenFxTUFmX3UxMnh4OUJ0bm9feG5hQjVuSTVmYUZA4bGhOcGF1T3RsUmlhZADB4SDZAuN3hMMUdSRlp3RnZAfbFNKWVJvYXZANNmM2Y2dsTwZDZD');
        xhrImageData.send();
    }
    render() {
        return (
            <div>
                <Header page="home" logoClass="app-logo-home" clickLogout={this.logoutHandler} clickProfile={this.profilePageHandler}></Header>
                <div className="container">
                    {this.state.images.map(image => (
                        <Card imageDetails={image} key={image.id}></Card>
                    )
                    )}
                </div>
            </div>
        )
    }
}
export default Home;