import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Button, Card, Row, Col } from 'react-bootstrap';

class Home extends Component{

    render(){
        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                 <Card border="light" style={{ width: '69.5rem' , backgroundColor: 'whitesmoke'}}>
                 <Card.Img width={271} height={280} variant="left" src={`${item.cover}`} fluid/>
                     <Card.Body>
                     <Card.Title>{`${item.title}`}</Card.Title>
                     <Card.Subtitle className="mb-2 text-muted">{`Author: ${item.author}`}</Card.Subtitle>
                         <Card.Text>
                             <Row className="show-grid">
                                 <Col md={6}>
                                     <p>{`Description: ${item.description}`}</p>
                                 </Col>
                             </Row>
                         </Card.Text>
                         <Button variant="outline-info">Go to book page</Button>
                     </Card.Body>
                 </Card>
                 <br/>
                 </div>

            )
        })

        return(
            <div className="container">
            <h1 font-family="Courier New">Home Page</h1>
            <br/>
                <h3 className="center" font-style="italic">Popular items</h3>
                <div>
                    {itemList}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }

export default connect(mapStateToProps)(Home)