import React, {Component} from "react";

export default class LoginSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn
        }
    }

    render() {
        return (
            <div>
                <h1>Login Settings</h1>
            </div>
        );
    }
}