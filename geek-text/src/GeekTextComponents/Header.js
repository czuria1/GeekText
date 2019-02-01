import React, {Component} from "react";
import ProfileLoginButton from './ProfileLoginButton'
import ShoppingCartIcon from "./ShoppingCartIcon";

class Header extends Component {
    
    render () {
        return (
            <div className="topnav">
                <div className="logo">
                    <h1 align = "center">Geek Text</h1>
                </div>
                <div className="loginButton">
                    <ProfileLoginButton></ProfileLoginButton>
                </div>
                <div className="shoppingCartButton">
                    <ShoppingCartIcon></ShoppingCartIcon>
                </div>
            </div>
        )
    }
}

export default Header;