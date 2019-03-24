import React, {Component} from "react";
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Panel from './PaymentMethodPanel';
import Grid from '@material-ui/core/Grid';
import { Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData,
  } from './utils';

function PaymentMethod(cardType, endingNum, expDate, nameOnCard, address, city, country, phoneNum) {
    this.cardType = cardType;
    this.endingNum = endingNum;
    this.expDate = expDate;
    this.nameOnCard = nameOnCard;
    this.address = address;
    this.city = city;
    this.country = country;
    this.phoneNum = phoneNum;
}

export default class PaymentSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn,
            dialogOpen: false, 
            currPayMethods: [], 
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: ''
        }

        this.addPayment = this.addPayment.bind(this);
        // this.removePayment = this.removePayment.bind(this);
    }

    addPayment() {
        // this.state.currPayMethods.push({cardType: 'Visa', endingNum: '1234', expDate: '06/2303', nameOnCard: 'Maxwell Doe', 
        // address: '34242jh', city: 'Miami, FL', country: 'United States', phoneNum: '342-432-4324'});
        this.state.currPayMethods.push(new PaymentMethod(this.state.issuer, this.state.number, this.state.expiry, this.state.name, 'test', 'test', 'test', 'test'));
        this.setState({payments: this.state.currPayMethods, dialogOpen: false});
        this.setState({number: '',
                        name: '',
                        expiry: '',
                        cvc: '',
                        issuer: '',
                        focused: ''});
    }

    handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          this.setState({ issuer });
        }
      };

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }
    
    handleClose = () => {
        this.setState({ dialogOpen: false });
    }

    componentWillUpdate(nextProps, nextState) {
        console.log("PaymentSettings will update", nextProps, nextState);
        if (nextProps !== this.props) {
            this.setState({
                payments: nextProps.payments
            })
        }
    }

    removePayment(index) {
        delete this.state.currPayMethods[index];
        this.setState({payments: this.state.currPayMethods});
    }

    render() {

        const that = this;

        const panels = this.state.currPayMethods.map(function (item, index) {
           return (
           <Panel
                cardType={item.cardType}
                endingNum={item.endingNum}
                expDate={item.expDate}
                nameOnCard={item.nameOnCard}
                address={item.address}
                city={item.city}
                country={item.country}
                phoneNum={item.phoneNum}
                removePayment={event => that.removePayment(index)}
                ></Panel>)
        });

        const { name, number, expiry, cvc, issuer, focused} = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">New Payment Method</DialogTitle>
                    <DialogContent>
                        <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        issuer={issuer}
                        focused={focused}
                        callback={this.handleCallback}
                        />
                        <DialogContentText>
                        Please enter your card information here in the fields below.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="number"
                            label="Card Number"
                            fullWidth
                            inputProps={{maxLength: 22}}
                            onChange={event => this.setState({number: formatCreditCardNumber(event.target.value)})}
                            onFocus={event => this.setState({number: formatCreditCardNumber(event.target.value), focused: 'number'})}/>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Name"
                            fullWidth
                            onChange={event => this.setState({name: event.target.value})}
                            onFocus={event => this.setState({name: event.target.value, focused: 'name'})}/>
                        <TextField
                            margin="dense"
                            id="expiry"
                            label="Valid Thru"
                            onChange={event => this.setState({expiry: event.target.value})}
                            onFocus={event => this.setState({expiry: event.target.value, focused: 'expiry'})}/>
                        <TextField
                            margin="dense"
                            id="cvc"
                            label="CVC"
                            onChange={event => this.setState({cvc: event.target.value})}
                            onFocus={event => this.setState({cvc: event.target.value, focused: 'cvc'})}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.addPayment} color="primary">
                        Add Payment
                        </Button>
                    </DialogActions>
                </Dialog>
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
                    <h3>Your Payment Methods</h3>
                    <Button onClick={this.handleClickOpen}>Add A Payment Method</Button>
                    </Grid>
                    <Grid 
                        item xs={6}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
                    {panels}
                    </Grid>
                </Grid>
            </div>
        );
    }
}