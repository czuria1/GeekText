import React, {Component} from "react";
import Registration from "./Registration";
import ajaxme from "ajaxme";
import LoginScreen from "./Registration";

class RegistrationScreen extends Component {

    constructor (props) {
        super (props);
        this.state = {
            isRegistrationSuccess: false, 
            username: '', 
            fname: '',
            lname: '',
            nickname: '',
            email: '',
            password_1: '',
            password_2: '',

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerButtonClicked = this.registerButtonClicked.bind(this);
    }

    handleSubmit (event) {
        this.setState({
            username: event.target.value, 
            fname: event.target.value,
            lname: event.target.value,
            nickname: event.target.value,
            email: event.target.value,
            password_1: event.target.value,
            password_2: event.target.value,
        })
    }

    registerButtonClicked() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=registerUser&username=' + `${document.getElementById('usernameInput').value}` + '&firstname=' + `${document.getElementById('fnameInput').value}` 
                + '&lastname=' + `${document.getElementById('lnameInput').value}` + '&nickname=' + `${document.getElementById('nicknameInput').value}`
                + '&email=' + `${document.getElementById('emailInput').value}` + '&password_1=' + `${document.getElementById('pw_1_Input').value}`
                + '&password_2=' + `${document.getElementById('pw_2_Input').value}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    isRegistrationSuccess: true
                })
                console.log('success', XMLHttpRequest);
            }.bind(this),
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
            },
            progress: function(XMLHttpRequest) {
            }
        });

    }

    redirectNewUser () {
        if (this.state.isRegistrationSuccess === true) {
            return (
                <div>
                    <h1>New User Created!</h1>
                    <LoginScreen></LoginScreen>
                </div>
            );
        } else {
            return (
                <Registration handleSubmit={this.handleSubmit}
                              registerButtonClicked={this.registerButtonClicked}></Registration>
            );
        }
    }

    render() {
        return (
            <div>
                {this.redirectNewUser()}
            </div>
        );
    }

}

export default RegistrationScreen;