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
        sessionStorage.clear();
        this.props.history.push("/");
    }
    profilePageHandler = () => {
        this.props.history.push("/profile");
    }
    findHashtags = (text) => {
        let str = text + "";
        var result = str.split(' ').filter(v => v.startsWith('#'));
        return result.join(' ');
    }
    removeHashtags = (text) => {
        console.log(text);
        if (typeof text !== "undefined") {
            let str = text + " ";
            var regexp = new RegExp('#([^\\s]*)', 'g');
            return str.replace(regexp, '');
        } else {
            return "";
        }
    }
    newRandomNumber = () => {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
    componentDidMount() {
        let accessToken = sessionStorage.getItem("accessToken");
        console.log(this.props.api);
        if (accessToken === null) {
            this.props.history.push("/");
        } else {
            let thisComponent = this;
            let xhrImageData = new XMLHttpRequest();
            var images = [];
            xhrImageData.addEventListener('readystatechange', function () {
                if (this.readyState === 4) {
                    let responseData = JSON.parse(this.response).data;
                    console.log(responseData);
                    thisComponent.newRandomNumber()
                    responseData.forEach(imageDetails => {
                        images.push({
                            id: imageDetails.id,
                            media_url: imageDetails.media_url,
                            username: imageDetails.username,
                            timestamp: imageDetails.timestamp,
                            hashTags: thisComponent.findHashtags(imageDetails.caption),
                            caption: thisComponent.removeHashtags(imageDetails.caption),
                            likes: thisComponent.newRandomNumber()
                        });
                    });
                    thisComponent.setState({ images: images })
                }
            });
            //Get Request for Media
            xhrImageData.open('GET', thisComponent.props.api.mediaURL + accessToken);
            xhrImageData.send();
        }
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