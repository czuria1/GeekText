import React, {Component} from "react";
import './login.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {NavLink, HashRouter} from "react-router-dom";

export default class LoginScreen extends Component {

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
                                    variant="outlined">Login</Button>
                                <br></br>
                                <br></br>
                                <br></br>
                                <NavLink style={{ textDecoration: 'none',  color: 'black', fontWeight: 'bold'}} 
                                    to="/registration"
                                    >Create Account</NavLink>
                            </div>
                    </div>
                </div>
            </div>
        </HashRouter>
        );
    }

}