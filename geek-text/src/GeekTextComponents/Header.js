import React, {Component} from "react";
import ProfileLoginButton from './ProfileLoginButton'
import ShoppingCartIcon from "./ShoppingCartIcon";
import { Button } from "@material-ui/core";


import {
    NavLink,
    HashRouter
  } from "react-router-dom";


class Header extends Component {
    
    render () {
        return (
            <HashRouter>
            <div className="topnav">
                <div className="logo">
                    <h1 align = "center">Geek Text</h1>
                </div>
                <div className="loginButton">
                    <Button variant="outlined">
                        <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/login"
                                 >Login</NavLink>
                    </Button>
                </div>
                <div className="shoppingCartButton">
                    <Button variant="outlined">
                        <NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                 to="/shoppingCart"
                                 >Shopping Cart</NavLink>
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
}

export default Header;