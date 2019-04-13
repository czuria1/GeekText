import React, { Component } from "react";
import ajaxme from "ajaxme";
import LoginScreen from "./LoginScreen";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Route, HashRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Validator from 'validator';

export default class RegistrationScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isRegistrationSuccess: false,
            username: 'null',
            fname: 'null',
            lname: 'null',
            nickname: 'null',
            email: 'null',
            password_1: 'null',
            password_2: 'null',
            formErrors: { username: '', password: '' },
            usernameValid: false,
            passwordValid: false,
            formValid: false

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.registerButtonClicked = this.registerButtonClicked.bind(this);
    }

    handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        if (fieldName === "email") {
            console.log(Validator.isEmail(this.state.email));
        }

        // this.setState({[fieldName] : fieldValue}, () => {this.validateField(fieldName, fieldValue)});
        this.setState({ [fieldName]: fieldValue });
    }

    validateField(field, value) {
        let usernameValid = this.state.usernameValid;
        let passwordValid = this.state.passwordValid;
        let formErrors = this.state.formErrors;

        switch (field) {
            case 'username':
                usernameValid = value.length > 0;
                formErrors.username = usernameValid ? '' : ' invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                formErrors.password = passwordValid ? '' : ' invalid';
                break;
            default:
                break;
        }

        this.setState({
            formErrors: formErrors,
            usernameValid: usernameValid,
            passwordValid: passwordValid
        }, this.validateLoginForm);
    }

    handleSubmit(event) {
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
            data: 'method=registerUser&username=' + `${this.state.username}` + '&firstname=' + `${this.state.fname}`
                + '&lastname=' + `${this.state.lname}` + '&nickname=' + `${this.state.nickname}`
                + '&email=' + `${this.state.email}` + '&password_1=' + `${this.state.password_1}`
                + '&password_2=' + `${this.state.password_2}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    isRegistrationSuccess: true
                })
                this.props.history.push('/login');
                console.log('success', XMLHttpRequest);
            }.bind(this),
            error: function (XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function (XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function (XMLHttpRequest) {
            },
            progress: function (XMLHttpRequest) {
            }
        });

    }

    redirectNewUser() {
        if (this.state.isRegistrationSuccess !== true) {
            return (
                <div>
                    <div className="outer">
                        <div className="registrationarea"
                            handleSubmit={this.handleSubmit}>
                            <TextField
                                id="usernameInput"
                                name="username"
                                className="textfield"
                                required
                                label="Username"
                                helperText="Enter your Username"
                                variant="outlined"
                                onChange={this.handleInput}
                                onClick={this.state.username === "" ? event => this.setState({ username: "" }) : event => this.setState({ username: event.target.value })}
                                error={this.state.username === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="fnameInput"
                                name="fname"
                                className="textfield"
                                required
                                label="First Name"
                                helperText="Enter your First Name"
                                variant="outlined"
                                onChange={this.handleInput}
                                onClick={this.state.fname === "" ? event => this.setState({ fname: "" }) : event => this.setState({ fname: event.target.value })}
                                error={this.state.fname === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="lnameInput"
                                name="lname"
                                className="textfield"
                                required
                                label="Last Name"
                                helperText="Enter your Last Name"
                                variant="outlined"
                                onChange={this.handleInput}
                                onClick={this.state.lname === "" ? event => this.setState({ lname: "" }) : event => this.setState({ lname: event.target.value })}
                                error={this.state.lname === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="nicknameInput"
                                name="nickname"
                                className="textfield"
                                label="Nickname"
                                helperText="Enter your Nickname"
                                variant="outlined"
                                onChange={this.handleInput}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="emailInput"
                                name="email"
                                className="textfield"
                                required
                                autoComplete="email"
                                type="email"
                                label="Email"
                                helperText="Enter your Email"
                                variant="outlined"
                                onChange={this.handleInput}
                                onClick={this.state.email === "" ? event => this.setState({ email: "" }) : event => this.setState({ email: event.target.value })}
                                error={Validator.isEmail(this.state.email) !== true}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="pw_1_Input"
                                name="password_1"
                                className="textfield"
                                required
                                type="password"
                                label="Password"
                                helperText="Enter your Password"
                                variant="outlined"
                                onChange={this.handleInput}
                                onClick={this.state.password_1 === "" ? event => this.setState({ password_1: "" }) : event => this.setState({ password_1: event.target.value })}
                                error={this.state.password_1 === ""}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="pw_2_Input"
                                name="password_2"
                                className="textfield"
                                required
                                type="password"
                                label="Password Confirmation"
                                variant="outlined"
                                onChange={this.handleInput}
                                error={this.state.password_1 !== this.state.password_2}
                                helperText={this.state.password_1 !== this.state.password_2 ? "Passwords do not match" : "Enter your Password Again"}></TextField>
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