import React, {Component} from 'react';
import { Card, Row, Col } from 'react-bootstrap';

export default class ItemDetails extends Component {
    constructor(props) {
        super(props);
    }
    
    render(){
        return (
            <div>
                <br/>
                <br/>
                <div>
                <Card border="light" style={{ width: '18rem' , backgroundColor: 'whitesmoke'}}>
                    <Card.Img variant="top" src={`${this.props.bookImage}`} width="100%" height="225vh" object-fit="cover"/>
                        <Card.Body>
                        <Card.Title>{`${this.props.bookTitle}`}</Card.Title>
                            <Card.Text>
                                <Row className="show-grid">
                                    <Col md={6}>
                                        <strong> {`$${this.props.bookPrice}`}</strong>
                                        <br/>
                                        <p> {`Author: ${this.props.author}`}</p>
                                    </Col>
                                    <Col md={5}> {`QTY: ${this.props.quantity}`}</Col>
                                </Row>
                                <Row><p>{`Description: ${this.props.desc}`}</p></Row>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        )
    }
}