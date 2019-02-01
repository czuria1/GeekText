import React, {Component} from "react";
import ProfileLoginButton from './ProfileLoginButton'

class Header extends Component {
    
    render () {
        return (
            <div className="topnav">
                <div className="loginButton">
                    <ProfileLoginButton></ProfileLoginButton>
                </div>
            </div>
        )
    }
}

export default Header;