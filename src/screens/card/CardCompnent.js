import React, { Component } from 'react';
import './CardCompnent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';


class CardCompnent extends Component {
    constructor() {
        super();
        this.state = {
            isLiked: false,
            imageDetails: {},
            comment: '',
            comments: [

            ]
        };
    }
    //Like handler
    likeHandler = (e) => {
        if (this.state.isLiked) {
            this.setState({
                isLiked: false,
                imageDetails: {
                    ...this.state.imageDetails,
                    likes: this.state.imageDetails.likes - 1
                }
            })
        } else {
            this.setState({
                isLiked: true,
                imageDetails: {
                    ...this.state.imageDetails,
                    likes: this.state.imageDetails.likes + 1
                }
            })
        }
    }
    componentDidMount() {
        this.setState({ imageDetails: this.props.imageDetails });
    }
    //comment text change handler
    commentTextChangeHandler = (e) => {
        this.setState({ comment: e.target.value })
    }
    //add comment handler
    addCommentHandler = () => {
        var comments = this.state.comments;
        comments.push({
            id: this.newRandomNumber(),
            title: this.state.comment
        });
        this.setState({ comments: comments })
        this.setState({ comment: "" });

        console.log(this.state.comments);
    }
    newRandomNumber = () => {
        return Math.floor(Math.random() * (100000 - 1 + 1)) + 1;
    }
    render() {
        return (
            <div>
                <Card className="root">
                    <CardHeader
                        avatar={
                            <Avatar className="profile-pic" src="profile_pic.png" alt="Profile Pic" />
                        }
                        title={this.props.imageDetails.username}
                        subheader={new Date(this.props.imageDetails.timestamp).toLocaleString()}
                    />
                    <CardContent>
                        <img className="mediaa" src={this.props.imageDetails.media_url} alt="Profile Pic" /><br /><br />
                        <Divider /><br />
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.imageDetails.caption}
                        </Typography>
                        <Typography variant="body2" component="p" className="hashtag">
                            {this.props.imageDetails.hashTags}
                        </Typography>
                        <div className="likes">
                            {this.state.isLiked ? <Favorite style={{ fill: "red" }} onClick={this.likeHandler} /> : <FavoriteBorderIcon onClick={this.likeHandler} />}
                            <Typography variant="body2" component="p" className="likesText">
                                {this.state.imageDetails.likes} likes
                        </Typography>
                        </div>
                        <div>
                            <List >
                                {this.state.comments.map((comm) => (
                                    <div key={comm.id} className="commentList">
                                        <span className="commentsbold">{this.props.imageDetails.username}: &nbsp;</span><span >{comm.title}</span>
                                    </div>
                                ))}
                            </List>

                        </div>
                        <div className="comment-Container">
                            <FormControl>
                                <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                <Input type="text" username="" className="commentText" onChange={this.commentTextChangeHandler} value={this.state.comment}></Input>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary" onClick={this.addCommentHandler} >Add</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default CardCompnent;