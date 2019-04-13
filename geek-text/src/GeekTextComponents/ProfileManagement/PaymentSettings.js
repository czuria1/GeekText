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
import InputMask from 'react-input-mask';
import Payment from 'payment';

function PaymentMethod(cardType, endingNum, expDate, nameOnCard, address, city, state, zip_code, country, phoneNum) {
    this.cardType = cardType;
    this.endingNum = endingNum;
    this.expiry = expDate;
    this.name = nameOnCard;
    this.address = address;
    this.city = city;
    this.state = state;
    this.zip_code = zip_code;
    this.country = country;
    this.phoneNum = phoneNum;
}

export default class PaymentSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUserId: props.currentUserId,
            dialogOpen: false, 
            editDialogOpen: false,
            currPayMethods: [], 
            currentEditPaymentMethod: 0,
            number: '',
            name: '',
            cardType: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '', 
            address: '', 
            state: '',
            city: '',
            zip_code: '',
            country: '',
            phoneNum: '',
            editNumber: '',
            editName: '',
            editCardType: '',
            editExpiry: '',
            editCvc: '',
            editIssuer: '',
            editAddress: '', 
            editState: '',
            editCity: '',
            editZip_code: '',
            editCountry: '',
            editPhoneNum: ''
        }

        this.addPayment = this.addPayment.bind(this);
        this.getUserPaymentMethods = this.getUserPaymentMethods.bind(this);
        // this.removePayment = this.removePayment.bind(this);
    }

    componentWillMount() {
        console.log("PaymentSettings will mount");
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
                if (XMLHttpRequest.responseText === "No existing payment methods for user") {
                
                } else {
                    this.setState({
                        currPayMethods: JSON.parse(XMLHttpRequest.responseText)
                    })
                    console.log('success', XMLHttpRequest);
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

    addPaymentButtonClicked() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=addPaymentMethods&currentUserId=' + `${this.state.currentUserId}` + '&card_type=' + `${this.state.cardType}` + '&card_num=' + `${this.state.number}`
                            + '&card_name=' + `${this.state.name}` + '&security_code=' + `${this.state.cvc}` + '&exp_date=' + `${this.state.expiry}`
                            + '&zip_code=' + `${this.state.zip_code}` + '&address=' + `${this.state.address}` + '&city=' + `${this.state.city}` 
                            + '&state=' + `${this.state.state}` + '&country=' + `${this.state.country}` + '&phone_num=' + `${this.state.phoneNum}`,
            success: function (XMLHttpRequest) {
                // this.getUserPaymentMethods();
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

    addPayment() {
        this.state.currPayMethods.push(new PaymentMethod(this.state.issuer, this.state.number, this.state.expiry, this.state.name, this.state.address, 
            this.state.city, this.state.state, this.state.zip_code, this.state.country, this.state.phoneNum));
        this.setState({payments: this.state.currPayMethods, dialogOpen: false});
        this.addPaymentButtonClicked();
        this.setState({
            number: '',
            name: '',
            expiry: '',
            cvc: '',
            issuer: '',
            focused: '', 
            address: '', 
            state: '',
            city: '',
            zip_code: '',
            country: '',
            phoneNum: ''});
    }

    removePayment(index) {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=deletePaymentMethod&paymentId=' + `${this.state.currPayMethods[index].payment_id}` + '&currentUserId=' + `${this.state.currentUserId}`,
            success: function (XMLHttpRequest) {
                delete this.state.currPayMethods[index];
                this.setState({payments: this.state.currPayMethods});
                this.getUserPaymentMethods();
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

    updateEditedPayment() {
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=addPaymentMethods&currentUserId=' + `${this.state.currentUserId}` + '&card_type=' + `${this.state.cardType}` + '&card_num=' + `${this.state.number}`
                            + '&card_name=' + `${this.state.name}` + '&security_code=' + `${this.state.cvc}` + '&exp_date=' + `${this.state.expiry}`
                            + '&zip_code=' + `${this.state.zip_code}` + '&address=' + `${this.state.address}` + '&city=' + `${this.state.city}` 
                            + '&state=' + `${this.state.state}` + '&country=' + `${this.state.country}` + '&phone_num=' + `${this.state.phoneNum}`,
            success: function (XMLHttpRequest) {
                this.getUserPaymentMethods();
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
          const issuer = Payment.fns.cardType(target.value);
          this.setState({ cardType: issuer});
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

    getEndingCardNum(item) {
        var endingNum = "" + item;
        return endingNum.slice(-4);
    }

    editPayment(item, index) {
        this.setState({ currentEditPaymentMethod: index,
            editNumber: item.card_num,
            editName: item.card_name,
            editCardType: item.card_type,
            editExpiry: item.exp_date,
            editCvc: item.security_code, 
            editAddress: item.address, 
            editState: item.state, 
            editCity: item.city,
            editZip_code: item.zip_code,
            editCountry: item.country,
            editPhoneNum: item.phone_num});
        this.handleEditClickOpen();
    }

    handleEditClickOpen = () => {
        this.setState({ editDialogOpen: true });
    }
    
    handleEditClose = () => {
        this.setState({ editDialogOpen: false });
    }

    render() {

        const that = this;

        const panels = this.state.currPayMethods.map(function (item, index) {
           return (
           <Panel
                cardType={item.card_type}
                endingNum={that.getEndingCardNum(item.card_num)}
                expDate={item.exp_date}
                nameOnCard={item.card_name}
                address={item.address}
                city={item.city}
                country={item.country}
                state={item.state}
                zip_code={item.zip_code}
                phone={item.phone}
                removePayment={event => that.removePayment(index)}
                editPayment={event => that.handleEditClickOpen(index)}
                ></Panel>)
        });

        const { name, number, expiry, cvc, issuer, focused} = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.editDialogOpen}
                    onClose={this.handleEditClose}
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
                            error={this.state.number < 16}
                            inputProps={{minLength: 16, maxLength: 22}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="name"
                            label="Name"
                            fullWidth
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="expiry"
                            label="Valid Thru"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '5%'}}
                            margin="dense"
                            name="cvc"
                            label="CVC"
                            inputProps={{minLength: 3, maxLength: 4}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="address"
                            label="Billing Address"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="state"
                            label="Billing State"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '3%'}}
                            margin="dense"
                            name="city"
                            label="Billing City"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '3%'}}
                            margin="dense"
                            name="zip_code"
                            label="Billing Zip Code"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="country"
                            label="Billing Country"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="phoneNum"
                            label="Billing Phone Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}>
                            <InputMask mask="(999) 999-9999" maskChar=" " />
                            </TextField>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleEditClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.updateEditedPayment} color="primary">
                        Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>


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
                            error={this.state.number < 16}
                            inputProps={{minLength: 16, maxLength: 22}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="name"
                            label="Name"
                            fullWidth
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="expiry"
                            label="Valid Thru"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '5%'}}
                            margin="dense"
                            name="cvc"
                            label="CVC"
                            inputProps={{minLength: 3, maxLength: 4}}
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="address"
                            label="Billing Address"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            margin="dense"
                            name="state"
                            label="Billing State"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '3%'}}
                            margin="dense"
                            name="city"
                            label="Billing City"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            style={{marginLeft: '3%'}}
                            margin="dense"
                            name="zip_code"
                            label="Billing Zip Code"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="country"
                            label="Billing Country"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}/>
                        <TextField
                            required
                            fullWidth
                            margin="dense"
                            name="phoneNum"
                            label="Billing Phone Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}>
                            <InputMask mask="(999) 999-9999" maskChar=" " />
                            </TextField>
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
                    <h3>Your Payment Methods</h3>
                    <Button onClick={this.handleClickOpen}>Add A Payment Method</Button>
                    </Grid>
                    <Grid 
                        style={{paddingTop: '50px'}}
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