import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

export default class LoginSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn
        }
    }

    render() {
        return (
            <div>
                <Grid
                    style={{
                      height: 300}}
                    container spacing={0}
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Grid 
                      item xs={7}
                      container
                      direction="column"
                      justify="flex-start"
                      alignItems="left">
                      <h3>Your Addresses</h3>
                      </Grid>
                        <Grid 
                          item xs={6}
                          container
                          direction="row"
                          justify="center"
                          alignItems="center">
                            <TextField 
                                    style={{paddingBottom: '1%'}}
                                    className="textfield"
                                    name="username"
                                    required
                                    label="Username"
                                    variant="outlined"></TextField>
                            <TextField 
                                    className="textfield"
                                    name="username"
                                    required
                                    label="Username"
                                    variant="outlined"></TextField>
                        </Grid>
                        <Grid 
                            item xs={7}
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="left">
                            <Button 
                                onClick={this.handleClickOpen}>Save Changes</Button>
                            </Grid>
                      </Grid>
            </div>
        );
    }
}