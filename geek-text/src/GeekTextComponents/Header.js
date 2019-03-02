import React, {Component} from "react";
import { Button } from "@material-ui/core";
import Image from 'react-bootstrap/Image';
import image from './Images/shoppingCartIcon.png';
import {
    NavLink,
    HashRouter
  } from "react-router-dom";


class Header extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: props.currentUser,
            isUserLoggedIn: props.isUserLoggedIn
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

    loggedInUser () {
        if (this.state.isUserLoggedIn) {
            return (
                <div>
                    <div>
                        <h3>{this.state.currentUser}</h3>
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