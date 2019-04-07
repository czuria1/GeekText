import React, { Component } from "react";
import './login.css';
import ajaxme from "ajaxme";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { Route, NavLink, HashRouter } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'null',
            password: 'null',
            isLoggedIn: props.isUserLoggedIn,
            formErrors: { username: '', password: '' },
            usernameValid: false,
            passwordValid: false,
            formValid: false,
            userID: props.userID
        }

        this.loginButtonClicked = this.loginButtonClicked.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    updateCurrentUser() {
        this.props.setCurrentUser(this.state.username, this.state.userID, true);
    }

    // validateEmail(email) {
    //     const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     return regexp.test(email);
    // }

    handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        this.setState({ [fieldName]: fieldValue }, () => { this.validateField(fieldName, fieldValue) })
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

    validateLoginForm() {
        this.setState({
            formValid: this.state.usernameValid && this.state.passwordValid
        });
    }

    //    componentWillMount() {
    //        console.log("LoginScreen will mount");
    //    }
    //
    //    componentDidMount() {
    //        console.log("LoginScreen did mount!");
    //    }
    //
    //    componentWillReceiveProps(nextProps) {
    //        console.log("LoginScreen will receive props", nextProps);
    //    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should LoginScreen update", nextProps, nextState);
        // if (nextState.status === 1) {
        //     return false;
        // }

        return true;
    }

    //    componentWillUpdate(nextProps, nextState) {
    //        console.log("LoginScreen will update", nextProps, nextState);
    //    }
    //
    //    componentDidUpdate(prevProps, prevState) {
    //        console.log("LoginScreen did update", prevProps, prevState);
    //    }
    //
    //    componentWillUnmount() {
    //        console.log("LoginScreen will unmount");
    //    }

    loginButtonClicked() {
        ajaxme.post({
            url: 'http://localhost:82/server.php/post',
            data: 'method=loginUser&username=' + `${this.state.username}` + '&password=' + `${this.state.password}`,
            success: function (XMLHttpRequest) {
                if (XMLHttpRequest.responseText === "No such user exists") {
                    // TODO
                    alert("Username or password is invalid");
                    return;
                } else {
                    this.setState({
                        userID: JSON.parse(XMLHttpRequest.responseText)[0].id
                    })
                    this.updateCurrentUser();
                    this.props.history.push('/');
                    console.log('success', JSON.parse(XMLHttpRequest.responseText)[0].id);
                }
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

    redirectUser() {
        if (!this.state.isLoggedIn) {
            return (
                <HashRouter>
                    <div>
                        <div className="outer">
                            <div className="loginarea">
                                <Grid>

                                </Grid>
                                <TextField
                                    className="textfield"
                                    name="username"
                                    required
                                    label="Username"
                                    variant="outlined"
                                    onChange={this.handleInput}
                                    error={this.state.username === ""}
                                    helperText={this.state.username.length > 0 ? "Enter your username" : "Not a valid username"}></TextField>
                                <br></br>
                                <br></br>
                                <TextField
                                    className="textfield"
                                    name="password"
                                    required
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={this.handleInput}
                                    error={this.state.password === ""}
                                    helperText={this.state.password.length > 5 ? "Password meets requirements" : "Password must be at least 6 characters long"}></TextField>
                                <br></br>
                                <br></br>
                                <div className="submitArea">
                                    <Button
                                        className="submitButton"
                                        variant="outlined"
                                        disabled={!this.state.formValid}
                                        onClick={this.loginButtonClicked}>Login
                                        </Button>
                                    <br></br>
                                    <br></br>
                                        <NavLink style={{ textDecoration: 'none',  color: 'black', fontWeight: 'bold'}} 
                                            to="/registration" replace
                                            >Create Account</NavLink>
                                    </div>
                            </div>
                        </div>
                    </div>
                </HashRouter>
            )
        } else {
            return (
                <h1>User is logged in</h1>
            )
        }
    }

    render() {
        return (
            <div>
                {this.redirectUser()}
            </div>
        );
    }

}