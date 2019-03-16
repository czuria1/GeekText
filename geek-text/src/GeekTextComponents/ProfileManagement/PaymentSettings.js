import React, {Component} from "react";

export default class PaymentSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn
        }
    }

    render() {
        return (
            <div>
                <h1>Payment Settings</h1>
            </div>
        );
    }
}