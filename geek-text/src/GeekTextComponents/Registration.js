import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const Registration = (props) => 
{
    return(
        <div>
            <div className="outer">
                    <div className="registrationarea">
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
                            label="First Name"
                            helperText="Enter your First Name"
                            variant="outlined"></TextField>
                        <br></br>
                        <br></br>
                        <TextField 
                            className="textfield"
                            required
                            label="Last Name"
                            helperText="Enter your Last Name"
                            variant="outlined"></TextField>
                        <br></br>
                        <br></br>
                        <TextField 
                            className="textfield"
                            label="Nickname"
                            helperText="Enter your Nickname"
                            variant="outlined"></TextField>
                        <br></br>
                        <br></br>
                        <TextField 
                            className="textfield"
                            required
                            autoComplete="email"
                            type="email"
                            label="Email"
                            helperText="Enter your Email"
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
                        <TextField
                            className="textfield"
                            required
                            type="password"
                            label="Password Confirmation"
                            helperText="Enter your Password Again"
                            variant="outlined"></TextField>
                        <br></br>
                        <br></br>
                        <div className="submitArea">
                            <Button
                                className="submitButton"
                                variant="outlined">Submit</Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Registration;