import React, { Component } from 'react';
import { List, ListItem } from '@material-ui/core';
import './BookDetails.css'
import { Image } from 'react-bootstrap';
import ajaxme from "ajaxme";
import StarsRating from 'stars-rating'

class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        }

        this.getBookReview = this.getBookReview.bind(this);
        this.getBookReview();
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps);
        console.log(prevState);
    }

    getBookReview() {
        
        //Used to connect to the server
        ajaxme.post({
            url: 'http://localhost/server.php/post',
            data: 'method=getBookReview&searchParam=' + `${this.props.location.state.book.bookInfo.title}`,
            success: function(XMLHttpRequest) {
                if (XMLHttpRequest.responseText !== "0 results")
                {
                    this.setState({
                        reviews: JSON.parse(XMLHttpRequest.responseText)
                    })
                }
            }.bind(this),
            error: function(XMLHttpRequest) {
                console.log('error', XMLHttpRequest);
            },
            abort: function(XMLHttpRequest) {
                console.log('abort', XMLHttpRequest);
            },
            loadstart: function(XMLHttpRequest) {
            },
            progress: function(XMLHttpRequest) {
            }
        });
    }

    displayReviews() {

        if (this.state.reviews.length !== 0)
        {
            var reviewList = this.state.reviews.map(function(review, index){
                return <div key={index} id="reviewContainer">
                            <StarsRating count={5} value={review.rating} size={30} edit={false}></StarsRating>
                            <span>{review.comment}</span>
                            <p></p>
                            <span>By: {review.username}</span>
                       </div>
              })
        }
        else
        {
            return <span>No reviews for this book</span>
        }
        return reviewList;
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
                <p></p>
                <h3>Reviews</h3>
                <span>{bookInfo.bio}</span>
                <h3>Ratings and Comments</h3>
                <hr></hr>
                {/* <StarsRating count={5} value={bookInfo.rating} size={30} edit={false}></StarsRating> */}
                <span>{bookInfo.comment}</span>
                {this.displayReviews()}
            </div> 
        );
    }
}
 
export default BookDetails;