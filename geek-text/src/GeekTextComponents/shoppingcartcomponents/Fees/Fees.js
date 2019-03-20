import React, {Component} from "react";
import { Row, Col, Tooltip, OverlayTrigger} from 'react-bootstrap';

export default class Fees extends Component{
    render() {
        const tooltip = (
            <Tooltip id="tooltip">
            <p>Taxes and extra fees associated with this cart.</p>
            </Tooltip>
        );
        return(
            <Row className="show-grid">
                <Col md={6}>
                    <OverlayTrigger placement="bottom" overlay={tooltip}>
                        <div>Taxes:</div>
                    </OverlayTrigger>
                </Col>
                <Col md={6}>{`$${this.props.fees}`}</Col>
            </Row>
        );
    }
}