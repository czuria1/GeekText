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
    }

    componentWillMount() {
        console.log("Header will mount");
    }

    componentDidMount() {
        console.log("Header did mount!");
    }

    componentWillReceiveProps(nextProps) {
        console.log("Header will receive props", nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should Header update", nextProps, nextState);
        // if (nextState.status === 1) {
        //     return false;
        // }
        
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("Header will update", nextProps, nextState);
        if (nextProps.username !== this.state.currentUser) {
            this.setState({
                currentUser: nextProps.username, 
                isUserLoggedIn: nextProps.isUserLoggedIn
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Header did update", prevProps, prevState);
    }

    componentWillUnmount() {
        console.log("Header will unmount");
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
                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
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