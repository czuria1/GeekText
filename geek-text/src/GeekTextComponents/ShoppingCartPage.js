import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';

import SubTotal from './shoppingcartcomponents/Subtotal/Subtotal';
import PickupSavings from './shoppingcartcomponents/PickupSavings/PickupSavings';
import './ShoppingCartPage.css';
import image from './Images/shoppingCartIcon.png';
import Fees from './shoppingcartcomponents/Fees/Fees'

class ShoppingCartPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            total: 100,
            PickupSavings: -2.99,
            fees: 2.3
        };
    }
    //TODO 27:00
    render() {
        return (
            <div className="shopping-cart">
                <h1 className="shoppingcarttitle">
                <Media>
                    <img
                        width={75}
                        height={75}
                        src={image}
                    />
                     <h2>Shopping Cart</h2>
                </Media></h1>
                <Container className="purchase-card">
                    <SubTotal price={this.state.total.toFixed(2)}/>
                    <PickupSavings price={this.state.PickupSavings.toFixed(2)}/>
                    <Fees fees={this.state.fees.toFixed(2)}/>

                </Container>
            </div>
        );
    }
}

export default ShoppingCartPage;
