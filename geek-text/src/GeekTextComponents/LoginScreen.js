import React, {Component} from "react";
import Login from "./Login";

class LoginScreen extends Component {

    constructor (props) {
        super (props);
        this.state = {
            username:'', 
            password:'', 
            isLogin: true
        }
    }

    render() {
        return (
            // <div className = "loginScreen">
            //     {this.state.LoginScreen}
            // </div>
            <Login></Login>
        );
    }

}

export default LoginScreen;