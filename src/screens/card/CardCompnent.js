import React, { Component } from 'react';
import './CardCompnent.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


class CardCompnent extends Component {
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
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <img className="mediaa" src="logo192.png" alt="Profile Pic" />
                        <Divider /><br />
                        <Typography variant="body2" color="textSecondary" component="p">
                            Team of great people at Upgrad
                        </Typography>
                        <Typography variant="body2" component="p" className="hashtag">
                            #greatPeople #upgrad
                        </Typography>
                        <IconButton><FavoriteBorderIcon /></IconButton>
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