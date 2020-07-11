import React, { Component } from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';


class Header extends Component {

    constructor() {
        super();
        this.state = {
            anchorEl: '',
            OpenMenu : false,
        };
    }
    clickHandle = (event) => {
        this.setState({anchorEl : event.currentTarget})
        this.setState({OpenMenu : true})

    }
    handleClose = (event) => {
        this.setState({OpenMenu : false})
    }
    render() {
        return (
            <div>
                <header className="app-header">
                    <span className="app-logo">Image Viewer</span>
                    {this.props.searchBarEnable === "true" ?
                        <div className="search-container">
                            <div className="search-bar">
                                <SearchIcon className="searchIcon"></SearchIcon>
                                <Input className="search" id="username" type="text" username="username" placeholder="Search..." disableUnderline={true}></Input>
                            </div>
                            <IconButton color="primary" onClick={this.clickHandle}>
                                <img className="profile-pic" src="logo192.png" alt="Profile Pic" />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                keepMounted
                                open={this.state.OpenMenu}
                                onClose={this.handleClose}
                                
                            >
                                <MenuItem onClick={this.handleClose}>My Account</MenuItem>
                                <Divider variant="middle" />
                                {/* <Link to="/"> */}
                                <MenuItem onClick={this.props.clickLogout}>Logout</MenuItem>
                                {/* </Link> */}
                            </Menu>
                        </div> : ""
                    }
                </header>
            </div>
        )
    }
}
export default Header;