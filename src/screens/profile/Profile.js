import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

// const tileData = [
//     {
//         img: "logo192.png",
//         title: 'Image1',
//         author: 'author',
//         cols: 2,
//     },{
//         img: "logo192.png",
//         title: 'Image2',
//         author: 'author',
//         cols: 2,
//     },
//     {
//         img: "logo192.png",
//         title: 'Image3',
//         author: 'author',
//         cols: 2,
//     },
//     {
//         img: "logo192.png",
//         title: 'Image4',
//         author: 'author',
//         cols: 2,
//     },
//     {
//         img: "logo192.png",
//         title: 'Image5',
//         author: 'author',
//         cols: 2,
//     },
//     {
//         img: "logo192.png",
//         title: 'Image6',
//         author: 'author',
//         cols: 2,
//     }
// ];
class Profile extends Component {
        constructor() {
        super();
        this.state = {
            username : '',
            media_count : 0,
            profile : [],
            images: []
            
        };
    }
    logoutHandler = () => {
        this.props.history.push("/");
    }
    homeHandler = (e) => {
        this.props.history.push("/home");
    }
    componentDidMount() {
        let thisComponent = this;
        let xhrUserData = new XMLHttpRequest();
        //Instagram API for a logged in user to fetch user details
        xhrUserData.addEventListener('readystatechange', function () {
            if (this.readyState === 4) {
                let responseData = JSON.parse(this.response);
                console.log(responseData.username)
                thisComponent.setState({ username: responseData.username })
                thisComponent.setState({ profile: {
                    username : responseData.username,
                    media_count : responseData.media_count
                } })

                

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
                <Header page="profile" logoClass="app-logo-profile" clickLogout={this.logoutHandler} clickHome={this.homeHandler}></Header>
                <div className="container">
                    <div className="info-Profile">
                        <img className="info-profilePic" src="logo192.png" alt="Profile Pic" />
                        <div className="info-details">
                            <Typography variant="h5">
                                {this.state.profile.username}
                            </Typography>
                            <div className="info-middle">
                                <Typography variant="body2" component="p">
                                    Posts : {this.state.profile.media_count}
                            </Typography>
                                <Typography variant="body2" component="p">
                                    Follow : 6
                            </Typography>
                                <Typography variant="body2" component="p">
                                    Followed By : 6
                            </Typography>
                            </div>
                            <div className="fullName">
                                <Typography variant="subtitle1" component="p">
                                    Upgrad Education
                            </Typography>
                                <button color="secondary" variant="contained" className="editBtn">
                                    <EditIcon fontSize="small"></EditIcon>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="profile-images">
                            <GridList cellHeight={350} cols={3}>
                                {this.state.images.map((image) => (
                                    <GridListTile key={image.id} cols={image.cols || 1}>
                                        <img className="image-grid" src={image.media_url} alt={image.id} />
                                    </GridListTile>
                                ))}
                            </GridList>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;