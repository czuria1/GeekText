import React, {Component} from "react";
import Card from './AddressCard';
import Grid from '@material-ui/core/Grid';
import {HashRouter} from "react-router-dom";

export default class AddressSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn
        }
    }

    render() {
        return (
            <HashRouter>
                <Grid
                    style={{flexGrow: 1,
                        height: 500}}
                    container spacing={24}
                    direction="row"
                    justify="center"
                    alignItems="center"> 
                    <Grid 
                        item xs={12}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    <h1>Account Settings</h1>
                    </Grid>
                    <Grid item xs={3}>
                        <Card></Card>
                    </Grid>
                    </Grid>
            </HashRouter>
        );
    }
}