import React, {Component} from "react";
import { Button } from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import image from './Images/shoppingCartIcon.png';
import {
    NavLink,
    HashRouter
  } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {

    constructor (props) {
        super (props);
        this.state = {
            anchorEl: null,
            currentUser: props.currentUser,
            isUserLoggedIn: props.isUserLoggedIn
        }

        this.logoutCurrentUser = this.logoutCurrentUser.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Header will update", nextProps, nextState);
        if (nextProps !== this.props) {
            this.setState({
                currentUser: nextProps.username, 
                isUserLoggedIn: nextProps.isUserLoggedIn
            })
        }
    }
    
    render () {
        return (
            <HashRouter>
            <div className="topnav">
                <div className="logo">
                    <h1 align = "center">Geek Text</h1>
                </div>
                <div className="loginButton">
                    {this.loggedInUser()}
                </div>
                <div className="shoppingCartButton">
                    <Button variant="outlined">
                        <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/shoppingCart"
                                 ><Image src={image} width={128}
                                 height={128} roundedCircle fluid/>
                        </NavLink>
                    </Button>
                </div>
                <div>
                    <Button variant="outlined">
                        <NavLink style={{ textDecoration: 'none', color: 'black'}}
                                 to="/search"
                                 >Search</NavLink>
                    </Button>
                </div>
            </div>
            </HashRouter>
        )
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.logoutCurrentUser();
        alert("You have been logged out");
        
    };

    logoutCurrentUser() {
        // this.props.logoutCurrentUser("null", false);
        this.setState({
            currentUser: "null", 
            isUserLoggedIn: false
        });
    }

    loggedInUser () {

        const { anchorEl } = this.state;

        if (this.state.isUserLoggedIn) {
            return (
                <div>
                    <div>
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}
                            >{this.props.currentUser}</Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            >
                            <MenuItem onClick={this.handleClose}>
                                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/profilesettings"
                                 onClick={this.handleClose}
                                 >Profile</NavLink>
                                </MenuItem>
                            <MenuItem onClick={this.handleLogout}>Sign Out</MenuItem>
                        </Menu>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Button variant="outlined">
                        <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/login"
                                 >Login</NavLink>
                    </Button>
                </div>
            )
        }
    }
}

export default Header;