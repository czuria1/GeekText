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

export default class PaymentSettings extends Component {

    constructor (props) {
        super (props);
        this.state = { 
            currentUser: props.isUserLoggedIn,
            dialogOpen: false, 
            payments: [
                {cardType: '', endingNum: '', expDate: '', nameOnCard: '', 
                  address: '', city: '', country: '', phoneNum: ''}]
        }

        this.addPayment = this.addPayment.bind(this);
        // this.removePayment = this.removePayment.bind(this);
    }

    addPayment() {
        this.state.payments.push({cardType: 'Visa', endingNum: '1234', expDate: '06/2303', nameOnCard: 'Maxwell Doe', 
        address: '34242jh', city: 'Miami, FL', country: 'United States', phoneNum: '342-432-4324'});
        this.setState({payments: this.state.payments, dialogOpen: false});
    }

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
        delete this.state.payments[index];
        this.setState({payments: this.state.payments});
    }

    render() {

        const that = this;

        const panels = this.state.payments.map(function (item, index) {
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

        return (
            <div>
                {/* <Cards
                    number={49}
                    name={"Test"}
                    expiry={30}
                    cvc={309}
                    focused={"name"}
                    /> */}
                <Dialog
                    open={this.state.dialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        />
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
                        item xs={12}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center">
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