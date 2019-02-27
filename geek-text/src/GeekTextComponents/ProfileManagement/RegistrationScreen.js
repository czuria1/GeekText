import React, {Component} from "react";
import ajaxme from "ajaxme";
import LoginScreen from "./LoginScreen";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

export default class RegistrationScreen extends Component {

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

    handleValidation() {
        
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
            <div>
                <div className="outer">
                        <div className="registrationarea"
                             handleSubmit={this.handleSubmit}>
                            <TextField 
                                id="usernameInput"
                                className="textfield"
                                required
                                label="Username"
                                helperText="Enter your Username"
                                variant="outlined"
                                onChange={event => this.setState({username: event.target.value})}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField 
                                id="fnameInput"
                                className="textfield"
                                required
                                label="First Name"
                                helperText="Enter your First Name"
                                variant="outlined"
                                onChange={this.fname}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="lnameInput" 
                                className="textfield"
                                required
                                label="Last Name"
                                helperText="Enter your Last Name"
                                variant="outlined"
                                onChange={this.lname}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="nicknameInput" 
                                className="textfield"
                                label="Nickname"
                                helperText="Enter your Nickname"
                                variant="outlined"
                                onChange={this.nickname}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="emailInput" 
                                className="textfield"
                                required
                                autoComplete="email"
                                type="email"
                                label="Email"
                                helperText="Enter your Email"
                                variant="outlined"
                                onChange={this.email}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="pw_1_Input" 
                                className="textfield"
                                required
                                type="password"
                                label="Password"
                                helperText="Enter your Password"
                                variant="outlined"
                                onChange={this.password_1}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="pw_2_Input"
                                className="textfield"
                                required
                                type="password"
                                label="Password Confirmation"
                                helperText="Enter your Password Again"
                                variant="outlined"
                                onChange={this.password_2}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <div className="submitArea">
                                <Button
                                    id="submitButton"
                                    className="submitButton"
                                    variant="outlined"
                                    onClick={this.registerButtonClicked}>Submit</Button>
                            </div>
                        </div>
                </div>
        </div>
                
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