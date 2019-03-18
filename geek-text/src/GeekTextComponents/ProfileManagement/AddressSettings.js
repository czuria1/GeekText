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

function Address(name, address, city, country, phoneNum) {
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phoneNum = phoneNum;
}

export default class AddressSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn,
            dialogOpen: false, 
            addresses: [], 
            name: '',
            address: '',
            city: '',
            country: '',
            phoneNum: ''
        }

        this.addAddress = this.addAddress.bind(this);
    }

    addAddress() {
        this.state.addresses.push(new Address(this.state.name, this.state.address, this.state.city, this.state.country, this.state.phoneNum));
        this.setState({addresses: this.state.addresses, dialogOpen: false});
        this.setState({
                        name: '',
                        address: '',
                        city: '',
                        country: '',
                        phoneNum: ''});
    }

    removeAddress(index) {
        delete this.state.addresses[index];
        this.setState({addresses: this.state.addresses});
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }
    
    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    render() {

        const that = this;

        const cards = this.state.addresses.map(function (item, index) {
            return (
            <Card
                 nameOnCard={item.name}
                 address={item.address}
                 city={item.city}
                 country={item.country}
                 phoneNum={item.phoneNum}
                 removeAddress={event => that.removeAddress(index)}
                 ></Card>)
         });

        return (
            <HashRouter>
                <div>
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
                            label="Full Name"
                            fullWidth
                            onChange={event => this.setState({name: event.target.value})}
                            onFocus={event => this.setState({name: event.target.value})}/>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="address"
                            label="Address"
                            fullWidth
                            onChange={event => this.setState({address: event.target.value})}
                            onFocus={event => this.setState({address: event.target.value})}/>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="city"
                            label="City"
                            fullWidth
                            onChange={event => this.setState({city: event.target.value})}
                            onFocus={event => this.setState({city: event.target.value})}/>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="country"
                            label="Country"
                            fullWidth
                            onChange={event => this.setState({country: event.target.value})}
                            onFocus={event => this.setState({country: event.target.value})}/>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="phoneNum"
                            label="Phone Number"
                            fullWidth
                            onChange={event => this.setState({phoneNum: event.target.value})}
                            onFocus={event => this.setState({phoneNum: event.target.value})}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.addAddress} color="primary">
                        Add Address
                        </Button>
                    </DialogActions>
                </Dialog>

                <Grid
                    style={{flexGrow: 1,
                        height: 200}}
                    container spacing={8}
                    direction="column"
                    justify="center"
                    alignItems="center"> 
                    <Grid 
                        item xs={7}
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="left">
                    {/* <h6 style={{'padding-bottom': 30}}>
                    <NavLink style={{ textDecoration: 'true', color: 'black'}}
                                 to="/addressSettings"
                                 >Your Account</NavLink>
                                 > Your Addresses</h6> */}
                    <h3>Your Addresses</h3>
                    <Button onClick={this.handleClickOpen}>Add Address</Button>
                    <Grid container spacing={7}
                          style={{flexGrow: 1, padding: 7}}
                          direction="row"
                          justify="space-evenly"
                          alignItems="flex-start">
                        {cards}
                    </Grid>
                    </Grid>
                    </Grid>
                    </div>
            </HashRouter>
        );
    }
}