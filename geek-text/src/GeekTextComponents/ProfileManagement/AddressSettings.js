import React, {Component} from "react";
import Card from './AddressCard';
import Grid from '@material-ui/core/Grid';
import {
    NavLink,
    HashRouter
  } from "react-router-dom";
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ajaxme from "ajaxme";

function Address(name, address, address_2, city, state, zip_code, country, phoneNum, isHomeAddress) {
    this.name = name;
    this.address = address;
    this.address_2 = address_2;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
    this.country = country;
    this.phoneNum = phoneNum;
    this.isHomeAddress = isHomeAddress;
}

export default class AddressSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUserId: props.currentUserId, 
            dialogOpen: false, 
            editDialogOpen: false,
            addresses: [],
            currentEditAddress: 0, 
            name: '',
            address: '',
            address_2: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
            phoneNum: '',
            isHomeAddress: false, 
            editName: '',
            editAddress: '',
            editAddress_2: '',
            editCity: '',
            editState: '',
            editZip_code: '',
            editCountry: '',
            editPhoneNum: ''
        }

        this.addAddress = this.addAddress.bind(this);
    }

    handleInput = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        
        this.setState({[fieldName] : fieldValue});
    }

    componentWillMount() {
        console.log("AddressSettings will mount");
        this.getUserAddresses();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            this.setState({
                addresses: nextState.addresses
            })
        }
    }

    getUserAddresses() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getAddresses&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    addresses: JSON.parse(XMLHttpRequest.responseText)
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

    addAddress() {
        this.state.addresses.push(new Address(this.state.name, this.state.address, this.state.address_2, this.state.city, this.state.state, this.state.zip_code, this.state.country, this.state.phoneNum));
        this.setState({addresses: this.state.addresses, dialogOpen: false});
        this.addAddressButtonClicked();
        this.setState({
                        name: '',
                        address: '',
                        address_2: '',
                        city: '',
                        state: '',
                        zip_code: '',
                        country: '',
                        phoneNum: ''});
    }

    addAddressButtonClicked() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=addAddress&currentUserId=' + `${this.state.currentUserId}` + '&name=' + `${this.state.name}`
                                               + '&address=' + `${this.state.address}` + '&address_2=' + `${this.state.address_2}` + '&city=' + `${this.state.city}` 
                                               + '&state=' + `${this.state.state}` + '&zip_code=' + `${this.state.zip_code}` + '&country=' + `${this.state.country}` 
                                               + '&phone=' + `${this.state.phoneNum}`,
            success: function (XMLHttpRequest) {
                console.log('success', XMLHttpRequest);
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

    removeAddress(index) {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=deleteAddress&address_id=' + `${this.state.addresses[index].address_id}` + '&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                delete this.state.addresses[index];
                this.setState({addresses: this.state.addresses});
                console.log('success', XMLHttpRequest);
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

    setHomeAddress(index) {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=setHomeAddress&address_id=' + `${this.state.addresses[index].address_id}` + '&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                console.log('success', XMLHttpRequest);
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

    editAddress(item, index) {
        this.setState({ currentEditAddress: index,
            editName : item.name,
            editAddress: item.address,
            editAddress_2: item.address_2, 
            editCity: item.city, 
            editState: item.state, 
            editCountry: item.country, 
            editPhoneNum: item.phoneNum});
        this.handleEditClickOpen();
    }

    // TODO
    updateEditedAddress() {
        // let addressesCopy = JSON.parse(JSON.stringify(this.state.addresses));
        // addressesCopy[this.state.currentEditAddress] = newAddress;
        // this.setState({addresses: addressesCopy});
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }
    
    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    handleEditClickOpen = () => {
        this.setState({ editDialogOpen: true });
    }
    
    handleEditClose = () => {
        this.setState({ editDialogOpen: false , currentEditAddress: []});
    }

    render() {

        const that = this;

        const cards = this.state.addresses.map(function(item, index) {
            return (
                <Grid
                    style={{padding: '10px'}}
                    item sm={4}>
                    <Card
                        name={item.name}
                        address={item.address}
                        address_2={item.address_2}
                        city={item.city}
                        state={item.state}
                        zip_code={item.zip_code}
                        country={item.country}
                        phoneNum={item.phoneNum}
                        editAddress={event => that.editAddress(item, index)}
                        removeAddress={event => that.removeAddress(index)}
                        setHomeAddress={event => that.setHomeAddress(index)}
                        ></Card>
                </Grid>)
         });

        return (
                <div>
                <Dialog
                open={this.state.editDialogOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Update Address</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please enter your address information here in the fields below.
                    </DialogContentText>
                    <TextField
                        required
                        margin="dense"
                        value={this.state.editName}
                        name="editName"
                        id="name"
                        label="Full Name"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        id="address"
                        value={this.state.editAddress}
                        name="editAddress"
                        label="Address"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        id="address"
                        label="Address 2"
                        value={this.state.editAddress_2}
                        name="editAddress_2"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        id="city"
                        value={this.state.editCity}
                        name="editCity"
                        label="City"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        id="state"
                        value={this.state.editState}
                        name="editState"
                        label="State"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        id="zip_code"
                        value={this.state.editZip_code}
                        name="editZip_code"
                        label="Zip Code"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        value={this.state.editCountry}
                        name="editCountry"
                        id="country"
                        label="Country"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}/>
                    <TextField
                        required
                        margin="dense"
                        value={this.state.editPhoneNum}
                        name="editPhoneNum"
                        id="phoneNum"
                        label="Phone Number"
                        fullWidth
                        onChange={this.handleInput}
                        onFocus={this.handleInput}>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleEditClose} color="primary">
                    Cancel
                    </Button>
                    <Button 
                    // disabled
                    onClick={this.updateEditedAddress} color="primary">
                    Save Changes
                    </Button>
                </DialogActions>
            </Dialog>

                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">New Address</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please enter your address information here in the fields below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="name"
                            label="Full Name"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            id="address"
                            name="address"
                            label="Address"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            id="address"
                            label="Address 2"
                            name="address_2"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            id="city"
                            name="city"
                            label="City"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            id="state"
                            name="state"
                            label="State"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            id="zip_code"
                            name="zip_code"
                            label="Zip Code"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            name="country"
                            id="country"
                            label="Country"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                        <TextField
                            required
                            margin="dense"
                            name="phoneNum"
                            id="phoneNum"
                            label="Phone Number"
                            fullWidth
                            onChange={this.handleInput}
                            onFocus={this.handleInput}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button 
                        // disabled
                        onClick={this.addAddress} color="primary">
                        Add Address
                        </Button>
                    </DialogActions>
                </Dialog>

                  <Grid
                    style={{height: 300}}
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
                      <Button onClick={this.handleClickOpen}>Add Address</Button>
                      </Grid>
                        <Grid 
                          item xs={7}
                          spacing
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="center">
                            {cards}
                        </Grid>
                      </Grid>
                    </div>
        );
    }
}