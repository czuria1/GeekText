import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity} from './shoppingcartcomponents/actions/cartActions'
import CheckOutComponent from './shoppingcartcomponents/CheckOutComponent'
import ItemDetails from './shoppingcartcomponents/ItemDetails/ItemDetails'
import {Button, Collapse, Card, Row, Col, Media, Image } from 'react-bootstrap';
import image from './Images/shoppingCartIcon.png';
import './ShoppingCartPage.css';

class Cart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleRemove = (id)=>{
        this.props.removeItem(id);
    }
    handleAddQuantity = (id)=>{
        this.props.addQuantity(id);
    }
    handleSubtractQuantity = (id)=>{
        this.props.subtractQuantity(id);
    }
    render(){
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                       
                        <li key={item.bookInfo.id}>
                                    <ItemDetails quantity={item.bookInfo.quantity} author={item.bookInfo.author} bookImage={item.bookInfo.cover} bookTitle={item.bookInfo.title} bookPrice={item.bookInfo.price} desc={item.bookInfo.description.substr(0,75) + "..."}/>
                                    <div className="item-desc">
                                        <div className="add-remove">
                                            <Link to="/shoppingCart"><Button variant="outline-secondary" onClick={()=>{this.handleAddQuantity(item)}}>Increase qty</Button></Link>
                                            <Link to="/shoppingCart"><Button  variant="outline-secondary" onClick={()=>{this.handleSubtractQuantity(item)}}>Decrease qty</Button></Link>
                                        </div>
                                        <Button variant="outline-danger" onClick={()=>{this.handleRemove(item)}}>Remove from cart</Button>
                                    </div>
                                </li>
                         
                    )
                })
            ):
             (
                <p>No items in your cart.</p>
             )

       return(
           
            <div className="container">
            <h1 className="shoppingcarttitle">
                <Media>
                    <img
                        width={75}
                        height={75}
                        src={image}
                    />
                     <h2>Shopping Cart</h2>
                </Media></h1>
            <br/>
            <Button className="item-details-button" variant="outline-primary" onClick={() => this.setState({ open: !this.state.open})}>
                {this.state.open === false ? `See` : `Hide ` } items in cart
                {this.state.open === false ? `+` : `-` }
                </Button>
                <br/>
                <br/>
            <Collapse in={this.state.open}>
                <div className="cart">
                    <h5>Items in your cart:</h5>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                </div> 
                </Collapse>
                <CheckOutComponent />          
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (book)=>{dispatch(removeItem(book))},
        addQuantity: (book)=>{dispatch(addQuantity(book))},
        subtractQuantity: (book)=>{dispatch(subtractQuantity(book))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)