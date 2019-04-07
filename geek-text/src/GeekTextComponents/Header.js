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
import Cart from 'react-icons/lib/ti/shopping-cart';
import SearchIcon from 'react-icons/lib/fa/search';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import SearchArea from "./Display Book Info Components/SearchArea";

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
        //console.log("Header will update", nextProps, nextState);
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
<<<<<<< Updated upstream
                    <h1 align = "left">Geek Text</h1>
=======
                <Button>
                <NavLink style={{ textDecoration: 'none', color: 'black'}}
                                 to="/HomePage"
                                 ><h1 align = "center">Geek Text</h1></NavLink>
                    </Button>
>>>>>>> Stashed changes
                </div>
                <div id="search-info-container" className="search">
                <SearchArea></SearchArea>
                {/* <InputGroup style={{display: 'flex', alignItems: 'center'}}>
                    <FormControl
                        style={{borderRadius: '1.2rem'}}
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                        />
                    <InputGroup.Append style={{paddingLeft: '3%'}}>
                    <Button style={{color: 'white'}}>
                        <SearchIcon size={20}></SearchIcon>
                    </Button>
                    </InputGroup.Append>
                </InputGroup> */}
                </div>
                <div className="rightIcons">
                    <div className="loginButton">
                        {this.loggedInUser()}
                    </div>
                    <div className="shoppingCartButton">
                        <NavLink style={{ textDecoration: 'none',  color: 'white'}} 
                                    to="/shoppingCart">
                                    <Cart size={35}></Cart>
                                    </NavLink>
                    </div>
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
        this.props.logoutUser("null", false);
    }

    loggedInUser () {

        const { anchorEl } = this.state;

        if (this.state.isUserLoggedIn) {
            return (
                <HashRouter>
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
                                 >Your Account</NavLink>
                                </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/loginSettings"
                                 onClick={this.handleClose}
                                 >Your Login Settings</NavLink>
                                </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/addressSettings"
                                 onClick={this.handleClose}
                                 >Your Addresses</NavLink>
                                </MenuItem>
                            <MenuItem onClick={this.handleClose}>
                                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/paymentSettings"
                                 onClick={this.handleClose}
                                 >Your Payment Methods</NavLink>
                                </MenuItem>
                            <MenuItem onClick={this.handleLogout}>
                                <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                    to="/"
                                    onClick={this.handleClose}
                                    >Sign Out</NavLink>
                            </MenuItem>
                        </Menu>
                    </div>
                </HashRouter>
            )
        } else {
            return (
                <div>
                    <NavLink style={{ textDecoration: 'none',  color: 'white'}} 
                                to="/login"
                                >Login / Register</NavLink>
                </div>
            )
        }
    }
}

export default Header;