import React, {Component} from "react";
import ProfileLoginButton from './ProfileLoginButton'
import ShoppingCartIcon from "./ShoppingCartIcon";

class Header extends Component {
    
    render () {
        return (
            <div className="topnav">
                <ShoppingCartIcon></ShoppingCartIcon>
                <div className="loginButton">
                    <ProfileLoginButton></ProfileLoginButton>
                </div>
            </div>
        )
    }
}

export default Header;