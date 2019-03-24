import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import './BookDetails.css'
import { Image } from 'react-bootstrap';

class BookDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() { 
        var bookInfo = this.props.location.state.book.bookInfo;
        
        return ( 
            <div id="bookDetailContainer">
                <List id="listInfo">
                    <ListItem>Format: Book</ListItem>
                    <ListItem>Title: {bookInfo.title}</ListItem>
                    <ListItem>Author: {bookInfo.author}</ListItem>
                    <ListItem>Publisher: {bookInfo.publisher}</ListItem>
                    <ListItem>Date Published: {bookInfo.pub_date}</ListItem>
                </List>
                <Image id="bookCover" src={bookInfo.cover} alt="Image not available" rounded fluid></Image>
                <p></p>
                <h3>Summary</h3>
                <hr></hr>
                <span>{bookInfo.description}</span>
                <p></p>
                <h3>About the author</h3>
                <hr></hr>
<<<<<<< HEAD
                <p></p>
                <h3>Reviews</h3>
=======
                <span>{bookInfo.bio}</span>
                <h3>Ratings and Comments</h3>
                <hr></hr>
                <StarsRating count={5} value={bookInfo.rating} size={30} edit={false}></StarsRating>
                <span>{bookInfo.comment}</span>
>>>>>>> parent of f91a7b2... Able to see reviews
            </div> 
        );
    }
}
 
export default BookDetails;