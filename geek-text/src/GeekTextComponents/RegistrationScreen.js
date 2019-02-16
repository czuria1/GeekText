import React, {Component} from "react";
import Registration from "./Registration";

class RegistrationScreen extends Component {

    constructor (props) {
        super (props);
        this.state = {
            username:'', 
            password:'', 
            isLogin: false
        }
    }

    render() {
        return (
            <Registration></Registration>
        );
    }

}

export default Registration;