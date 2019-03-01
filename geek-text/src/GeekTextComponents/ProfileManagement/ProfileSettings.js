import React, {Component} from "react";
import './login.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {NavLink, HashRouter} from "react-router-dom";

export default class ProfileSettings extends Component {

    constructor (props) {
        super (props);
        this.state = {
            isLoggedIn: true
        }
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <div className="outer">
                        <div className="loginarea">
                        <TextField 
                                id="usernameInput"
                                className="textfield"
                                value={this.state.username}
                                label="Username"
                                variant="outlined"
                                onChange={this.state.username}></TextField>
                            <br></br>
                            <br></br>
                            <TextField 
                                id="fnameInput"
                                className="textfield"
                                required
                                label="First Name"
                                helperText="Enter your First Name"
                                variant="outlined"
                                onChange={this.fname}></TextField>
                            <br></br>
                            <br></br>
                            <TextField
                                id="lnameInput" 
                                className="textfield"
                                required
                                label="Last Name"
                                helperText="Enter your Last Name"
                                variant="outlined"
                                onChange={this.lname}></TextField>
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
                                onChange={this.email}></TextField>
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
                                onChange={this.password_1}></TextField>
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
                                onChange={this.password_2}></TextField>
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
            </HashRouter>
        );
    }

}