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
            homeAddressId: props.homeAddress, 
            homeAddress: [], 
            userInfo: []

        }
    }

    handleInput = (e) => {

    }

    componentWillMount() {
        console.log("LoginSettings will mount");
        this.getUserInfo();
        this.getHomeAddress();
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("Should LoginSettings update", nextProps, nextState);
        return true;
    }

    getUserInfo() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getUserInfo&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                if (XMLHttpRequest.responseText === "No such user exists") {
                    
                } else {
                    this.setState({
                        userInfo: JSON.parse(XMLHttpRequest.responseText)
                    })
                    console.log('success', JSON.parse(XMLHttpRequest.responseText));
                }
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

    getHomeAddress() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getHomeAddress&address_id=' + `${this.state.homeAddressId}` + '&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
            if (XMLHttpRequest.responseText === "No existing addresses for user") {
                
            } else {
                this.setState({
                    homeAddress: JSON.parse(XMLHttpRequest.responseText)
                })
                console.log('success', JSON.parse(XMLHttpRequest.responseText));   
            }
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

    getNoHomeAddress() {
        return(
            <h6>No home address set</h6>
        )
    }

    changeHomeAddress() {
        this.props.history.push('/addressSettings');
    }

    render() {

        var that = this;

        const info = this.state.userInfo.map(function(item, index) {
            return(
                <div>
                <TextField 
                        style={{paddingBottom: '2%'}}
                        className="textfield"
                        name="username"
                        id={index}
                        value={item.username}
                        label="Username"
                        onChange={that.handleInput}
                        variant="outlined"></TextField>
                <TextField 
                        style={{paddingBottom: '2%'}}
                        className="textfield"
                        name="password"
                        label="Password"
                        type="password"
                        onChange={that.handleInput}
                        variant="outlined"></TextField>
                <TextField 
                        style={{paddingBottom: '2%'}}
                        className="textfield"
                        disabled
                        value={item.email !== 'null' ? item.email : undefined}
                        name="email"
                        label="Email"
                        onChange={that.handleInput}
                        variant="outlined"></TextField>
                <TextField 
                        style={{paddingBottom: '2%'}}
                        className="textfield"
                        nickname
                        value={item.nickname !== 'null' ? item.nickname : undefined}
                        name="nickname"
                        label="Nickname"
                        onChange={that.handleInput}
                        variant="outlined"></TextField>
                </div>
            )
        });

        const address = this.state.homeAddress.map(function(item, index) {
                return (
                    <HomeAddressPanel
                        name={item.name}
                        address={item.address}
                        address_2={item.address_2}
                        city={item.city}
                        state={item.state}
                        zip_code={item.zip_code}
                        country={item.country}
                        phone={item.phone}
                        ></HomeAddressPanel>
                )
        });

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
                            {info}
                        <Grid 
                            item xs={11}
                            direction="row"
                            justify="flex-start"
                            alignItems="center">
                            <p>Home Address</p>
                            </Grid>
                        <Grid 
                            item xs={9}
                            direction="row"
                            justify="center"
                            alignItems="center">
                                {this.state.homeAddress.length > 0 ? address : this.getNoHomeAddress()}
                        </Grid>
                        </Grid>
                        <Grid 
                            style={{paddingTop: '50px'}}
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