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
                    <ListItem>ISBN: {bookInfo.isbn}</ListItem>
                </List>
                <Image id="bookCover" src={bookInfo.cover} alt="Image not available" rounded fluid></Image>
                <h3>Summary</h3>
                <hr></hr>
                <span>{bookInfo.description}</span>
                <h3>About the author</h3>
                <hr></hr>
                <span>{bookInfo.bio}</span>
                <h3>Reviews</h3>
                <hr></hr>
                <span>{bookInfo.rating}</span>
                <span>{bookInfo.comment}</span>
            </div> 
        );
    }
}
 
export default BookDetails;