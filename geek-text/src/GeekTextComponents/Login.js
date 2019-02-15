import React from 'react';
import './login.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {NavLink, HashRouter} from "react-router-dom";

const Login = (props) => 
{
    return(
        <HashRouter>
            <div>
                <div className="outer">
                    <div className="loginarea">
                        <TextField 
                            required
                            label="Username"
                            helperText="Enter your Username"
                            variant="outlined"></TextField>
                        <br></br>
                        <br></br>
                        <TextField 
                            required
                            type="password"
                            label="Password"
                            helperText="Enter your Password"
                            variant="outlined"></TextField>
                            <br></br>
                            <br></br>
                            <Button
                                variant="outlined">Login</Button>
                            <Button
                                variant="outlined"><NavLink style={{ textDecoration: 'none',  color: 'black'}} 
                                to="/registration"
                                >Register</NavLink></Button>
                    </div>
                </div>
            </div>
        </HashRouter>
    )
}

export default Login;