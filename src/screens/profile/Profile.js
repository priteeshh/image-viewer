import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Modal from 'react-modal';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';




const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};
const imageCustomStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex'
    }
};
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
            editModalisOpen: false,
            imageModalisOpen: false,
            fullname: 'Preeteesh Remalli',
            username: '',
            media_count: 0,
            profile: [],
            images: [],
            selectedImage: {},
            updateFullName: ''

        };
    }
    logoutHandler = () => {
        this.props.history.push("/");
    }
    homeHandler = (e) => {
        this.props.history.push("/home");
    }
    closeModalHandler = () => {
        this.setState({ editModalisOpen: false });
    }
    modalHandler = () => {
        this.setState({
            editModalisOpen: true
        });
    }
    closeImageModalHandler = () => {
        this.setState({
            imageModalisOpen: false
        });
    }
    changeHandler = (e) => {
        e.target.id === 'fullname' && this.setState({ updateFullName: e.target.value })
    }
    fullNameChangeHandler = () => {
        this.setState({
            fullname: this.state.updateFullName,
            editModalisOpen: false
        })
    }
    imageClickHandler = (e) => {
        let Image = this.state.images.filter((image) => {
            return image.id === e.target.id
        })[0];
        this.setState({
            imageModalisOpen: true,
            selectedImage: Image
        })
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
                thisComponent.setState({
                    profile: {
                        username: responseData.username,
                        media_count: responseData.media_count
                    }
                })
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
                                    {this.state.fullname}
                                </Typography>
                                <button color="secondary" variant="contained" className="editBtn" onClick={this.modalHandler}>
                                    <EditIcon fontSize="small"></EditIcon>
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="profile-images">
                        <GridList cellHeight={350} cols={3}>
                            {this.state.images.map((image) => (
                                <GridListTile onClick={this.imageClickHandler} key={image.id} cols={image.cols || 1}>
                                    <img className="image-grid" src={image.media_url} alt={image.id} id={image.id} />
                                </GridListTile>
                            ))}
                        </GridList>
                    </div>
                    <div>

                    </div>
                </div>

                <Modal ariaHideApp={false} isOpen={this.state.editModalisOpen} contentLabel="Login"
                    onRequestClose={this.closeModalHandler} style={customStyles}>
                    <Typography variant="h5">
                        Edit
                    </Typography>
                    <FormControl>
                        <InputLabel required htmlFor="fullname">Full name</InputLabel>
                        <Input id="fullname" type="text" fullname={this.state.fullname} onChange={this.changeHandler}></Input>
                    </FormControl><br /><br />
                    <Button variant="contained" color="primary" onClick={this.fullNameChangeHandler}>Update</Button>
                </Modal>

                <Modal ariaHideApp={false} isOpen={this.state.imageModalisOpen} contentLabel="Login"
                    onRequestClose={this.closeImageModalHandler} style={imageCustomStyles} >
                    <div className="modal-image">
                        <img className="modalImage" src={this.state.selectedImage.media_url} alt={this.state.selectedImage.id} />
                    </div>
                    <div className="modal-content">
                        <div className="profile">
                            <img className="profilePage-pic" src="logo192.png" alt="Profile Pic" />
                            <Typography variant="h5">
                                {this.state.profile.username}
                            </Typography>
                        </div>
                        <Divider /><br />
                        <Typography variant="body2" component="p">
                            {this.state.selectedImage.caption}
                        </Typography>
                        <Typography variant="body2" component="p" className="hashtag">
                            #greatPeople #upgrad
                        </Typography>
                        <div className="comments">

                        </div>
                        <IconButton><FavoriteBorderIcon /></IconButton>
                        <div className="comment-Container">
                            <FormControl>
                                <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                <Input type="text" username="" className="commentText"></Input>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary">Add</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Profile;