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
  import ajaxme from "ajaxme";

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
            currentUserId: props.currentUserId,
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

    componentWillMount() {
        console.log("AddressSettings will mount");
        this.getUserPaymentMethods();
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps !== this.props) {
            this.setState({
                currPayMethods: nextState.currPayMethods
            })
        }
    }

    getUserPaymentMethods() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getPaymentMethods&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                this.setState({
                    currPayMethods: JSON.parse(XMLHttpRequest.responseText)
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

    handleInputChange = ({ target }) => {
        if (target.name === 'number') {
          target.value = formatCreditCardNumber(target.value);
        } else if (target.name === 'expiry') {
          target.value = formatExpirationDate(target.value);
        } else if (target.name === 'cvc') {
          target.value = formatCVC(target.value);
        }
    
        this.setState({ [target.name]: target.value });
      };

      handleInputFocus = ({ target }) => {
        this.setState({
          focused: target.name,
        });
      };

    removePayment(index) {
        delete this.state.currPayMethods[index];
        this.setState({payments: this.state.currPayMethods});
    }

    getEndingCardNum(item) {
        var endingNum = "" + item;
        return endingNum.slice(-4);
    }

    render() {

        const that = this;

        const panels = this.state.currPayMethods.map(function (item, index) {
           return (
           <Panel
                cardType={item.cardType}
                endingNum={that.getEndingCardNum(item.endingNum)}
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
                            name="number"
                            label="Card Number"
                            fullWidth
                            inputProps={{minLength: 16, maxLength: 22}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            margin="dense"
                            name="name"
                            label="Name"
                            fullWidth
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            margin="dense"
                            name="expiry"
                            label="Valid Thru"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            margin="dense"
                            name="cvc"
                            label="CVC"
                            inputProps={{minLength: 3, maxLength: 4}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
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