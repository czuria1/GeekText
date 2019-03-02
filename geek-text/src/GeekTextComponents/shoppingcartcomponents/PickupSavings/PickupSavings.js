import React, {Component} from "react";
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';

var styles = {
    pickupSavings: {
        textDecoration: 'underline'
    },
    totalSavings: {
        color: 'gray',
        fontWeight: 800
    }
};

export default class PickupSavings extends Component{
    render(){
        const tooltip = (
            <Tooltip id="tooltip">
            <p>Your total amount of savings for this cart.</p>
            </Tooltip>
        );
        return(
            <Row className="show-grid">
                <Col md={6}>
                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                        <div style={styles.pickupSavings}>Savings</div>
                    </OverlayTrigger>
                </Col>
                <Col style={styles.totalSavings} md={6} > {`$${this.props.price}`}</Col>
            </Row>
        );
    }
}