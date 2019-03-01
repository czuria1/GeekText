import React, {Component} from "react";
import './login.css';
import ajaxme from "ajaxme";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {NavLink, HashRouter} from "react-router-dom";

export default class LoginScreen extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            username: '', 
            password: '', 
            isLoggedIn: props.isUserLoggedIn
        }

        this.loginButtonClicked = this.loginButtonClicked.bind(this);
    }

    updateCurrentUser() {
        this.props.setCurrentUser(this.state.username);
    }

    loginButtonClicked() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=loginUser&username=' + `${this.state.username}` + '&password=' + `${this.state.password}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    isLoggedIn: true
                })
                this.updateCurrentUser.bind(this);
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

    redirectUser () {
        if (!this.state.isLoggedIn) {
            return (
                <HashRouter>
                    <div>
                        <div className="outer">
                            <div className="loginarea">
                                <TextField 
                                    className="textfield"
                                    required
                                    label="Username"
                                    helperText="Enter your Username"
                                    variant="outlined"></TextField>
                                <br></br>
                                <br></br>
                                <TextField
                                    className="textfield" 
                                    required
                                    type="password"
                                    label="Password"
                                    helperText="Enter your Password"
                                    variant="outlined"></TextField>
                                    <br></br>
                                    <br></br>
                                    <div className="submitArea">
                                        <Button
                                            className="submitButton"
                                            variant="outlined"
                                            onClick={this.loginButtonClicked}>Login</Button>
                                        <br></br>
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
                <h1>User successfully logged in</h1>
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