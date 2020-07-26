import React, { Component } from 'react';
import './CardCompnent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


class CardCompnent extends Component {
    constructor() {
        super();
        this.state = {
            isLiked: false,
            imageDetails: {}
        };
    }
    likeHandler = (e) => {
        if(this.state.isLiked){
            this.setState({
                isLiked: false,
                imageDetails:{...this.state.imageDetails,
                   likes: this.state.imageDetails.likes - 1
                }
            })
        }else{
            this.setState({
                isLiked: true,
                imageDetails:{...this.state.imageDetails,
                    likes: this.state.imageDetails.likes + 1
                 }
            })
        }
        console.log(this.state.imageDetails.likes)

    }
    componentDidMount() {
        this.setState({ imageDetails: this.props.imageDetails });
      }
    render() {
        return (
            <div>
                <Card className="root">
                    <CardHeader
                        avatar={
                            <IconButton color="primary">
                                <img className="profile-pic" src="logo192.png" alt="Profile Pic" />
                            </IconButton>
                        }
                        title ={this.props.imageDetails.username}
                        subheader={new Date(this.props.imageDetails.timestamp).toString()}
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
                            {this.state.isLiked ? <Favorite style={{fill: "red"}} onClick={this.likeHandler}/> : <FavoriteBorderIcon onClick={this.likeHandler}/>}
                        <Typography variant="body2" component="p" className="likesText">
                            {this.state.imageDetails.likes} likes
                        </Typography>
                        </div>
                        <div className="comment-Container">
                            <FormControl>
                                <InputLabel htmlFor="comment">Add a Comment</InputLabel>
                                <Input type="text" username="" className="commentText"></Input>
                            </FormControl><br /><br />
                            <Button variant="contained" color="primary">Add</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}
export default CardCompnent;