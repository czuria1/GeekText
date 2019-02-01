import React from 'react';
import './login.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Login = (props) => 
{
    return(
        <div>
            <div class="topnav">

            </div>
            <div class="outer">
                <div class="loginarea">
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
                        <Button>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Login;