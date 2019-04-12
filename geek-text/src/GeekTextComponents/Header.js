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
import Dropdown from 'react-bootstrap/Dropdown';
import SplitButton from 'react-bootstrap/SplitButton';

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
                <Button variant="Light">
                    <NavLink to="/HomePage">
                    <h1 align = "left">Geek Text</h1></NavLink>
                    </Button>
                <NavLink style={{ textDecoration: 'none',  color: 'white'}} 
                                    to="/">
                    <h1 align = "left">Geek Text</h1>
                    </NavLink>
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
                    <InputGroup.Append style={{paddingLeft: '1%'}}>
                    <Button style={{color: 'white'}}>
                        <SearchIcon size={20}></SearchIcon>
                    </Button>
                    </InputGroup.Append>
                </InputGroup> */}
                </div>
                <div className="rightIcons">
                    <div className="divider"></div>
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
                        <Dropdown>
                            <Button
                            disabled
                            style={{textDecoration: 'none', color: 'white', textTransform: 'none'}}
                            aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleClick}>
                            {this.props.currentUser}
                            </Button>
                            <Dropdown.Toggle split className="menuToggle"></Dropdown.Toggle>

                            <Dropdown.Menu alignRight>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/profilesettings"
                                        >Your Account</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/loginSettings"
                                        >Your Login Settings</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/addressSettings"
                                        >Your Addresses</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                    to="/paymentSettings"
                                    >Your Payment Methods</NavLink>
                                </Dropdown.Item>
                                <Dropdown.Item>
                                    <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                        to="/"
                                        onClick={this.handleLogout}
                                        >Sign Out</NavLink>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                            </Dropdown>
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