import React, {Component} from "react";
import './login.css';
import Card from './ProfileCard';
import Key from 'react-icons/lib/ti/key-outline';
import Address from 'react-icons/lib/ti/location-outline';
import Credit from 'react-icons/lib/ti/credit-card';
import Grid from '@material-ui/core/Grid';
import {HashRouter} from "react-router-dom";

const styles = theme => ({
    root: {
      flexGrow: 1,
      height: 300,
    },
});

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
                        <Card 
                            icon={<div style={{color: 'red'}}>
                                <Key size={90}></Key>
                            </div>}
                            title="Login & Security"
                            subtitle="Edit login, name, email, and home address"
                            event={event => this.props.history.push('/loginSettings')}></Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card 
                            icon={<div style={{color: 'red'}}>
                            <Address size={70}></Address>
                        </div>}
                            title="Addresses"
                            subtitle="Edit addresses for orders"
                            event={event => this.props.history.push('/addressSettings')}></Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card 
                            icon={<div style={{color: 'red'}}>
                            <Credit size={70}></Credit>
                        </div>}
                            title="Payment Options"
                            subtitle="Edit or add payment methods"
                            event={event => this.props.history.push('/paymentSettings')}></Card>
                    </Grid>
                </Grid>
            </HashRouter>
        );
    }

}