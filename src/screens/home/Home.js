import React, { Component } from 'react';
import './Home.css';
import Header from '../../common/header/Header'
import Card from '../card/CardCompnent';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            images: [],
            filterImages: []
        };
    }
    //Logout Handler
    logoutHandler = () => {
        sessionStorage.clear();
        this.props.history.push("/");
    }
    //Navigate to Profile Page
    profilePageHandler = () => {
        this.props.history.push("/profile");
    }
    //Function to get all hashtags from caption
    findHashtags = (text) => {
        let str = text + "";
        var result = str.split(' ').filter(v => v.startsWith('#'));
        return result.join(' ');
    }
    //Function to remove all hastags from caption 
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
    //Function to generate random number
    newRandomNumber = () => {
        return Math.floor(Math.random() * (10 - 1 + 1)) + 1;
    }
    //Finction for search feature
    searchHandler = (e) => {
        console.log(e.target.value);
        let filterImages = this.state.images.filter(image => {
            return image.caption.toLowerCase().includes(e.target.value.toLowerCase());
        });
        this.setState({ filterImages: filterImages })

    }
    componentDidMount() {
        let accessToken = sessionStorage.getItem("accessToken");
        console.log(this.props.api);
        //Checks if sessionstorage contains access-token or not
        if (accessToken === null) {
            this.props.history.push("/");   // if no access-token navigate to Login Page
        } else {
            //if access-token presents proceed with service call to get all posts
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
                    thisComponent.setState({ filterImages: images })

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
                <Header page="home" logoClass="app-logo-home" clickLogout={this.logoutHandler} clickProfile={this.profilePageHandler} searchHandler={this.searchHandler}></Header>
                <div className="container">
                    {this.state.filterImages.map(image => (
                        <Card imageDetails={image} key={image.id}></Card>
                    )
                    )}
                </div>
            </div>
        )
    }
}
export default Home;