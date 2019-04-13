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
            userInfo: [],
            username: '', 
            fname: '',
            lname: '',
            nickname: '',
            email: '',
            password: ''

        }

        this.updateUserInfo = this.updateUserInfo.bind(this);
    }

    handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        
        this.setState({[fieldName] : fieldValue});
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
            url: 'http://localhost:82/server.php/post',
            data: 'method=getUserInfo&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                if (XMLHttpRequest.responseText === "No such user exists") {
                    
                } else {
                    this.setState({
                        username: JSON.parse(XMLHttpRequest.responseText)[0].username, 
                        nickname: JSON.parse(XMLHttpRequest.responseText)[0].nickname,
                        fname: JSON.parse(XMLHttpRequest.responseText)[0].fname,
                        lname: JSON.parse(XMLHttpRequest.responseText)[0].lname,
                        email: JSON.parse(XMLHttpRequest.responseText)[0].email,
                        password: JSON.parse(XMLHttpRequest.responseText)[0].password,
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

    updateUserInfo() {
        ajaxme.post({
            url: 'http://localhost:82/server.php/post',
            data: 'method=updateUserInfo&currentUserId=' + `${this.state.currentUserId}` + '&username=' + `${this.state.username}` + '&firstname=' + `${this.state.fname}` 
                + '&lastname=' + `${this.state.lname}` + '&nickname=' + `${this.state.nickname}`
                + '&email=' + `${this.state.email}` + '&password=' + `${this.state.password}`,
            success: function (XMLHttpRequest) {
                alert("Your changes have been saved!");
                console.log('success', XMLHttpRequest.responseText);
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
            url: 'http://localhost:82/server.php/post',
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
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    name="username"
                                    value={this.state.username}
                                    label="Username"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    nickname
                                    value={this.state.fname}
                                    name="fname"
                                    label="First Name"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    nickname
                                    value={this.state.lname}
                                    name="lname"
                                    label="Last Name"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    value={this.state.email}
                                    name="email"
                                    label="Email"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
                            <TextField 
                                    style={{paddingBottom: '2%'}}
                                    className="textfield"
                                    nickname
                                    value={this.state.nickname.match("null") ? undefined : this.state.nickname}
                                    name="nickname"
                                    label="Nickname"
                                    onChange={this.handleInput}
                                    variant="outlined"></TextField>
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
                                onClick={this.updateUserInfo}>Save Changes</Button>
                            </Grid>
                      </Grid>
            </div>
        );
    }
}