import React, { Component } from 'react';
import './Profile.css';
import Header from '../../common/header/Header'
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const tileData = [
    {
        img: "logo192.png",
        title: 'Image1',
        author: 'author',
        cols: 2,
    },{
        img: "logo192.png",
        title: 'Image2',
        author: 'author',
        cols: 2,
    },
    {
        img: "logo192.png",
        title: 'Image3',
        author: 'author',
        cols: 2,
    },
    {
        img: "logo192.png",
        title: 'Image4',
        author: 'author',
        cols: 2,
    },
    {
        img: "logo192.png",
        title: 'Image5',
        author: 'author',
        cols: 2,
    },
    {
        img: "logo192.png",
        title: 'Image6',
        author: 'author',
        cols: 2,
    }
];
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
                <Header page="profile" logoClass="app-logo-profile" clickLogout={this.logoutHandler} clickHome={this.homeHandler}></Header>
                <div className="container">
                    <div className="info-Profile">
                        <img className="info-profilePic" src="logo192.png" alt="Profile Pic" />
                        <div className="info-details">
                            <Typography variant="h5">
                                Upgrade_sde
                            </Typography>
                            <div className="info-middle">
                                <Typography variant="body2" component="p">
                                    Posts : 6
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
                            <GridList cellHeight={350} cols={6}>
                                {tileData.map((tile) => (
                                    <GridListTile key={tile.title} cols={tile.cols || 1}>
                                        <img className="image-grid" src={tile.img} alt={tile.title} />
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