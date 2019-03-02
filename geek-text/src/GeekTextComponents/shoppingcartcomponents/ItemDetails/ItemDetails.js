import React, {Component} from 'react';
import {Button, Collapse, Card, Row, Col } from 'react-bootstrap';

export default class ItemDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    render(){
        return (
            <div>
                <Button className="item-details-button" variant="outline-primary" onClick={() => this.setState({ open: !this.state.open})}>
                {this.state.open === false ? `See` : `Hide ` } items in cart
                {this.state.open === false ? `+` : `-` }
                </Button>
                <br/>
                <br/>
                <Collapse in={this.state.open}>
                <div>
                <Card border="primary" style={{ width: '18rem' , backgroundColor: 'whitesmoke'}}>
                    <Card.Img width={171} height={180} variant="top" src={`${this.props.bookImage}`} fluid/>
                        <Card.Body>
                        <Card.Title>{`${this.props.bookTitle}`}</Card.Title>
                            <Card.Text>
                                <Row className="show-grid">
                                    <Col md={6}>
                                        <strong> {`$${this.props.bookPrice}`}</strong>
                                        <br/>
                                        <p> {`Author: ${this.props.author}`}</p>
                                    </Col>
                                    <Col md={5}> QTY: 1</Col>
                                </Row>
                            </Card.Text>
                            <Button variant="link">Go to book page</Button>
                        </Card.Body>
                    </Card>
                </div>
                </Collapse>
            </div>
        )
    }
}