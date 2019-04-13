import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeItem,addQuantity,subtractQuantity, addToSaveForLater, removeFromSaveForLater} from './shoppingcartcomponents/actions/cartActions'
import CheckOutComponent from './shoppingcartcomponents/CheckOutComponent'
import ItemDetails from './shoppingcartcomponents/ItemDetails/ItemDetails'
import {Button, Collapse} from 'react-bootstrap';
import './ShoppingCartPage.css';

class Cart extends Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            sflOpen: false
        };
    }

    handleRemove = (book)=>{
        this.props.removeItem(book);
    }
    handleAddQuantity = (book)=>{
        this.props.addQuantity(book);
    }
    handleSubtractQuantity = (book)=>{
        this.props.subtractQuantity(book);
    }
    handleAddToSaveForLater =(book)=>{
        this.props.addToSaveForLater(book);
    }
    handleRemoveFromSaveForLater =(book)=>{
        this.props.removeFromSaveForLater(book);
    }

    render(){
        let saved = this.props.savedForLater.length ? 
            (
                this.props.savedForLater.map(item=>{
                    return(
                        <ul key={item.bookInfo.id} list-style-type='none'>
                                    <ItemDetails quantity={item.bookInfo.quantity} author={item.bookInfo.author} bookImage={item.bookInfo.cover} bookTitle={item.bookInfo.title} bookPrice={item.bookInfo.price} desc={item.bookInfo.description.substr(0,75) + "..."}/>
                                    <div className="item-desc">
                                        <Button variant="danger" onClick={()=>{this.handleRemoveFromSaveForLater(item)}}>Do not save for later</Button>
                                    </div>
                                </ul>
                    )
                })
            ):
             (
                <p>You don't have any items saved for later.</p>
             );
              
        let addedItems = this.props.items.length ?
            (  
                this.props.items.map(item=>{
                    return(
                        <ul key={item.bookInfo.id} list-style-type= 'none'>
                                    <ItemDetails quantity={item.bookInfo.quantity} author={item.bookInfo.author} bookImage={item.bookInfo.cover} bookTitle={item.bookInfo.title} bookPrice={item.bookInfo.price} desc={item.bookInfo.description.substr(0,75) + "..."}/>
                                        <div className="add-remove">
                                            <Link to="/shoppingCart"><Button variant="outline-secondary" onClick={()=>{this.handleAddQuantity(item)}}>+ Increase qty</Button></Link>
                                            <Link to="/shoppingCart"><Button  variant="outline-secondary" onClick={()=>{this.handleSubtractQuantity(item)}}>- Decrease qty</Button></Link>
                                        </div>
                                        <div class="btn-toolbar">
                                        <Button variant="info" onClick={()=>{this.handleAddToSaveForLater(item)}}>Save For Later</Button>
                                        <Button variant="danger" onClick={()=>{this.handleRemove(item)}}>Remove from cart</Button>
                                    </div>
                                </ul>
                    )
                })
            ):
             (
                <p>No items in your cart.</p>
             )

       return(
           
            <div className="container">
            <h1 className="shoppingcarttitle">Shopping Cart</h1>
            <br/>
            <Button className="item-details-button" variant="outline-secondary" onClick={() => this.setState({ open: !this.state.open})}>
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
                <br/>
                <br/>
                <Button className="item-savedForLater-button" variant="outline-info" onClick={() => this.setState({ sflOpen: !this.state.sflOpen})}>
                {this.state.sflOpen === false ? `Open` : `Close` } Saved For Later
                {this.state.sflOpen === false ? `+` : `-` }
                </Button>
                <br/>
                <br/>
                <Collapse in={this.state.sflOpen}>
                <div className="savedForLater">
                    <h5>Items saved for later:</h5>
                    <ul className="collection">
                        {saved}
                    </ul>
                </div> 
                </Collapse>      
            </div>
       )
    }
}


const mapStateToProps = (state)=>{
    return{
        items: state.addedItems,
        savedForLater: state.saved
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        removeItem: (book)=>{dispatch(removeItem(book))},
        addQuantity: (book)=>{dispatch(addQuantity(book))},
        subtractQuantity: (book)=>{dispatch(subtractQuantity(book))},
        addToSaveForLater: (book)=>{dispatch(addToSaveForLater(book))},
        removeFromSaveForLater: (book)=>{dispatch(removeFromSaveForLater(book))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)