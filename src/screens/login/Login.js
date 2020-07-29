import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import Header from '../../common/header/Header'
import './Login.css';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            userNameRequired: 'displayNone',
            passwordRequired: 'displayNone',
            incorrectCredintials: 'displayNone',
        };
    }
    //Login Handler
    loginHandler = () => {
        let username = "admin";
        let password = "admin";
        let accessToken = "IGQVJYcXNneUpFbFNRZAVIwTXBvdUVoaUJ2aldHVzVIcXQxa2pqenFxTUFmX3UxMnh4OUJ0bm9feG5hQjVuSTVmYUZA4bGhOcGF1T3RsUmlhZADB4SDZAuN3hMMUdSRlp3RnZAfbFNKWVJvYXZANNmM2Y2dsTwZDZD";
        //Username and password validations
        if (this.state.username === username && this.state.password === password) {
            this.setState({ incorrectCredintials: 'displayNone' })
            this.setState({ userNameRequired: 'displayNone' })
            this.setState({ passwordRequired: 'displayNone' })
            sessionStorage.setItem("accessToken", accessToken);
            console.log(sessionStorage.getItem("accessToken"));
            this.props.history.push("/home");
        } else {
            if (this.state.username === '' || this.state.password === '') {
                this.state.username === '' ? this.setState({ userNameRequired: 'displayFormHelperText' }) : this.setState({ userNameRequired: 'displayNone' })
                this.state.password === '' ? this.setState({ passwordRequired: 'displayFormHelperText' }) : this.setState({ passwordRequired: 'displayNone' })
                this.setState({ incorrectCredintials: 'displayNone' })
            } else {
                this.setState({ incorrectCredintials: 'displayFormHelperText' })
                this.setState({ userNameRequired: 'displayNone' })
                this.setState({ passwordRequired: 'displayNone' })
            }
        }
    }
    // Username and Password change handler
    changeHandler = (e) => {
        e.target.id === 'username' && this.setState({ username: e.target.value })
        e.target.id === 'password' && this.setState({ password: e.target.value })
    }
    render() {
        return (
            <div>
                <Header logoClass="app-logo-home"></Header>
                <div className="login">
                    <div className="login-card">
                        <Card className="form-control">
                            <CardContent>
                                <Typography variant="h5">
                                    LOGIN
                                </Typography><br />
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="username">Username</InputLabel>
                                    <Input id="username" type="text" username={this.state.username} onChange={this.changeHandler}></Input>
                                    <FormHelperText className={this.state.userNameRequired}><span className="red">required</span></FormHelperText>
                                </FormControl><br /><br />
                                <FormControl required fullWidth>
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input id="password" type="password" password={this.state.password} onChange={this.changeHandler}></Input>
                                    <FormHelperText className={this.state.passwordRequired}><span className="red">required</span></FormHelperText>
                                    <FormHelperText className={this.state.incorrectCredintials}><span className="red">Incorrect username and/or password</span></FormHelperText>
                                </FormControl><br /><br />
                                <Button variant="contained" color="primary" onClick={this.loginHandler}>LOGIN</Button>
                            </CardContent><br />
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login;