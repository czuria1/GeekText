import React, {Component} from "react";
import { Row, Col} from 'react-bootstrap';

export default class Fees extends Component{
    render() {
        return(
            <Row className="show-grid">
                <Col md={6}> Estimated fees and taxes:</Col>
                <Col md={6}>{`$${this.props.fees}`}</Col>
            </Row>
        );
    }
}