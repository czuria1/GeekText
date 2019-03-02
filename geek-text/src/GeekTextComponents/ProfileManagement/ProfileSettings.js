import React, {Component} from "react";
import './login.css';
import {NavLink, HashRouter} from "react-router-dom";
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

export default class ProfileSettings extends Component {

    constructor (props) {
        super (props);
        this.state = {
            currentUser: props.currentUser, 
            newPassword: 'null',
            isLoggedIn: true
        }
    }

    handleClick() {
        alert("Your password has been updated!");
    }

    render() {
        
        return (
            <div>
                <div className="outer">
                    <div className="loginarea">
                        <TextField 
                            className="textfield"
                            disabled
                            value={this.state.currentUser}
                            helperText="Current Username"
                            variant="outlined"
                            ></TextField>
                                <br></br>
                                <br></br>
                                <TextField
                                    className="textfield" 
                                    type="password"
                                    label="New Password"
                                    helperText="Update your Password"
                                    variant="outlined"
                                    onChange={event => this.setState({newPassword: event.target.value})}
                                    ></TextField>
                                    <br></br>
                                    <br></br>
                        <div className="submitArea">
                            <Button
                                onClick={this.handleClick}>Update Password</Button>
                            <br></br>
                            <br></br>
                            <br></br>
                            <NavLink style={{ textDecoration: 'none',  color: 'black', fontWeight: 'bold'}} 
                                        to="/profilesettings" replace
                                        >Edit Personal Information</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}