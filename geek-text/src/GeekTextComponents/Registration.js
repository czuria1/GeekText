import React from 'react';

const Registration = (props) => 
{
    return(
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
                                variant="outlined">Submit</Button>
                    </div>
                </div>
        </div>
    )
}

export default Registration;