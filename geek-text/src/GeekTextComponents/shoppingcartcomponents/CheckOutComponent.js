import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Button, Row, Tooltip, OverlayTrigger} from "react-bootstrap"


class CheckOutComponent extends Component{
    
    componentWillUnmount() {
         if(this.refs.shipping.checked)
              this.props.substractShipping()
    }

    handleChecked = (e)=>{
        if(e.target.checked){
            this.props.addShipping();
        }
        else{
            this.props.substractShipping();
        }
    }
    

    render(){
        const tooltip = (
            <Tooltip id="tooltip">
            <p>Estimated total for this cart</p>
            </Tooltip>
        );
        return(
            <div className="container">
                <div className="collection">
                <br/>
                    <Row className="collection-item">
                            <label>
                                <input type="checkbox" ref="shipping" onChange= {this.handleChecked} />
                                <span>Expedited shipping(+9.99$)</span>
                            </label>
                        </Row>
                        <Row>
                        <OverlayTrigger placement="bottom" overlay={tooltip}>
                            <b>Total: {this.props.total.toFixed(2)} $</b>
                            </OverlayTrigger>
                            </Row>
                    </div>
                    <div className="checkout">
                    <br/>
                        <Button variation="primary">Checkout</Button>
                    </div>
                 </div>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        addedItems: state.addedItems,
        total: state.total
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addShipping: ()=>{dispatch({type: 'ADD_SHIPPING'})},
        substractShipping: ()=>{dispatch({type: 'SUB_SHIPPING'})}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CheckOutComponent)
