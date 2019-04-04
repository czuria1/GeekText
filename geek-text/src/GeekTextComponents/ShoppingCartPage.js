import React, {Component} from "react";
import Container from 'react-bootstrap/Container';
import Media from 'react-bootstrap/Media';
import SubTotal from './shoppingcartcomponents/Subtotal/Subtotal';
import Savings from './shoppingcartcomponents/Savings/Savings';
import './ShoppingCartPage.css';
import image from './Images/shoppingCartIcon.png';
import Fees from './shoppingcartcomponents/Fees/Fees'
import Total from './shoppingcartcomponents/Total/Total';
import ItemDetails from './shoppingcartcomponents/ItemDetails/ItemDetails';
import BookList from "./Display Book Info Components/BookList";

class ShoppingCartPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            shoppingCartBooks: [],
            bookTitle: "Harry Potter and the Chamber of Secrets",
            author:"J.K. Rowling",
            bookImage: "https://images-na.ssl-images-amazon.com/images/I/51jNORv6nQL._SX340_BO1,204,203,200_.jpg",
            bookPrice: 5.99,
            total: 5.99,
            savings: -2.99,
            fees: 0,
            finalTotal: 0
        };
    }

    componentDidMount=()=>{
        this.setState({
            fees: (this.state.total + this.state.savings) * 0.07
        },
        function(){
            this.setState({
                finalTotal: this.state.total + this.state.savings + this.state.fees
            });
        },
        function(){
            this.setState({
                total: this.bookPrice
            });
        }
        );
    };
    
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
                    <ItemDetails author={this.state.author} bookImage={this.state.bookImage} bookTitle={this.state.bookTitle} bookPrice={this.state.bookPrice.toFixed(2)}/>
                    <hr/>
                    <SubTotal price={this.state.total.toFixed(2)}/>
                    <Savings price={this.state.savings.toFixed(2)}/>
                    <Fees fees={this.state.fees.toFixed(2)}/>
                    <hr />
                    <Total price={this.state.finalTotal.toFixed(2)}/>
                </Container>
            </div>
        );
    }
}

export default ShoppingCartPage;
