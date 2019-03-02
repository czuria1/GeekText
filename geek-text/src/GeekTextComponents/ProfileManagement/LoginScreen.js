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
            username: 'null', 
            password: 'null', 
            isLoggedIn: props.isUserLoggedIn
        }

        this.loginButtonClicked = this.loginButtonClicked.bind(this);
        this.updateCurrentUser = this.updateCurrentUser.bind(this);
    }

    updateCurrentUser() {
        this.props.setCurrentUser(this.state.username, true);
    }

    componentWillMount() {
        console.log("LoginScreen will mount");
    }

    componentDidMount() {
        console.log("LoginScreen did mount!");
    }

    componentWillReceiveProps(nextProps) {
        console.log("LoginScreen will receive props", nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should LoginScreen update", nextProps, nextState);
        // if (nextState.status === 1) {
        //     return false;
        // }
        
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("LoginScreen will update", nextProps, nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("LoginScreen did update", prevProps, prevState);
    }

    componentWillUnmount() {
        console.log("LoginScreen will unmount");
    }

    loginButtonClicked() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=loginUser&username=' + `${this.state.username}` + '&password=' + `${this.state.password}`,
            success: function (XMLHttpRequest) {
                this.updateCurrentUser(this.state.username);
                this.props.history.push('/');
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
                        <h1>{this.state.isLoggedIn}</h1>
                        <div className="outer">
                            <div className="loginarea">
                                <TextField 
                                    className="textfield"
                                    required
                                    label="Username"
                                    helperText="Enter your Username"
                                    variant="outlined"
                                    onChange={event => this.setState({username: event.target.value})}
                                    onClick={this.state.username === "" ? event => this.setState({username: ""}) : event => this.setState({username: event.target.value})}
                                    error={this.state.username === ""}></TextField>
                                <br></br>
                                <br></br>
                                <TextField
                                    className="textfield" 
                                    required
                                    type="password"
                                    label="Password"
                                    helperText="Enter your Password"
                                    variant="outlined"
                                    onChange={event => this.setState({password: event.target.value})}
                                    onClick={this.state.password === "" ? event => this.setState({password: ""}) : event => this.setState({password: event.target.value})}
                                    error={this.state.password === ""}></TextField>
                                    <br></br>
                                    <br></br>
                                    <div className="submitArea">
                                        <Button
                                            className="submitButton"
                                            variant="outlined"
                                            onClick={this.loginButtonClicked}>Login
                                        </Button>
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