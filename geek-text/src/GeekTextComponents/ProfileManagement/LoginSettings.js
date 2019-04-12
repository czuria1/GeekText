import React, {Component} from "react";
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import HomeAddressPanel from './HomeAddressPanel';
import ajaxme from "ajaxme";

export default class LoginSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUserId: props.currentUserId,
            username: props.username, 
            homeAddressId: props.homeAddress, 
            homeAddress: []

        }
    }

    componentWillMount() {
        console.log("LoginSettings will mount");
        this.getHomeAddress();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should LoginSettings update", nextProps, nextState);
        
        return true;
    }

    getHomeAddress() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getHomeAddress&address_id=' + `${this.state.homeAddressId}` + '&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    homeAddress: JSON.parse(XMLHttpRequest.responseText)
                })
                console.log('success', JSON.parse(XMLHttpRequest.responseText));
            }.bind(this),
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
            },
            progress: function(XMLHttpRequest) {
            }
        });
    }

    displayHomeAddress() {
        if (this.state.homeAddress !== null) {
            return (
                <HomeAddressPanel
                    name={this.state.homeAddress.name}
                    address={this.state.homeAddress.address}
                    ></HomeAddressPanel>
            )
        } else {
            return (
                <h4>Null</h4>
            )
        }
    }

    render() {
        return (
            <div>
                <Grid
                    style={{paddingTop: '50px'}}
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
                      <h3>Your Login & Personal Information</h3>
                      </Grid>
                        <Grid 
                          style={{paddingTop: '50px'}}
                          item xs={6}
                          container
                          direction="row"
                          justify="center"
                          alignItems="center">
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    name="username"
                                    value={this.state.username}
                                    label="Username"
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    name="username"
                                    label="Password"
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    disabled
                                    name="email"
                                    label="Email"
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    nickname
                                    name="nickname"
                                    label="Nickname"
                                    variant="outlined"></TextField>
                            {this.displayHomeAddress()}
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