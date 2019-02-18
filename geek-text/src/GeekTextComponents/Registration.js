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
                            id="usernameInput"
                            className="textfield"
                            required
                            label="Username"
                            helperText="Enter your Username"
                            variant="outlined"
                            onChange={props.username}></TextField>
                        <br></br>
                        <br></br>
                        <TextField 
                            id="fnameInput"
                            className="textfield"
                            required
                            label="First Name"
                            helperText="Enter your First Name"
                            variant="outlined"
                            onChange={props.fname}></TextField>
                        <br></br>
                        <br></br>
                        <TextField
                            id="lnameInput" 
                            className="textfield"
                            required
                            label="Last Name"
                            helperText="Enter your Last Name"
                            variant="outlined"
                            onChange={props.lname}></TextField>
                        <br></br>
                        <br></br>
                        <TextField
                            id="nicknameInput" 
                            className="textfield"
                            label="Nickname"
                            helperText="Enter your Nickname"
                            variant="outlined"
                            onChange={props.nickname}></TextField>
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
                            onChange={props.email}></TextField>
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
                            onChange={props.password_1}></TextField>
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
                            onChange={props.password_2}></TextField>
                        <br></br>
                        <br></br>
                        <div className="submitArea">
                            <Button
                                id="submitButton"
                                className="submitButton"
                                variant="outlined"
                                onClick={props.registerButtonClicked}>Submit</Button>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Registration;