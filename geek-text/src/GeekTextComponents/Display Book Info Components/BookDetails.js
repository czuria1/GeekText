import React, { Component } from 'react';
import ajaxme from "ajaxme";
import { List, ListItem, Link } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import './BookDetails.css'
import { Image } from 'react-bootstrap';
import StarsRating from 'stars-rating'

class BookDetails extends Component {
    constructor(props) {
        super(props);
        console.log(props.currentUser);
        
        this.state = {
            reviews: [],
            openAlert: false,
            currentUser: props.currentUser
        }
        console.log(this.state.currentUser);
        
        this.getBookReview = this.getBookReview.bind(this);
        
    }
    
    componentDidMount() {
        this.getBookReview();
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
                            <StarsRating count={5} value={parseInt(review.rating, 10)} size={30} edit={false}></StarsRating>
                            <span>{review.comment}</span>
                            <p></p>
                            <span>By: {review.username}</span>
                            <hr></hr>
                       </div>
              })
        }
        else
        {
            return <span>No reviews for this book</span>
        }

        
        
        return reviewList;
    }

    getTotalReviews() {
        if (this.state.reviews.length !== 0) 
        {
            return parseInt(this.state.reviews[0].total , 10) / this.state.reviews.length;
        }
        else
        {
            return 0;
        }
    }

    checkIfUserOwnsBook() {
        if (this.state.currentUser === "")
        {
            this.setState({
                openAlert: true
            })
        }
    }

    handleClose() {
        this.setState({
            openAlert: false
        })
    }

    createAlert() {
        return <Dialog open={this.state.openAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                                    Let Google help apps determine location.This means sending anonymous location data to
                            Google, even when no apps are running.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Disagree
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
        </Dialog>;
    }

    render() { 
        var bookInfo = this.props.location.state.book.bookInfo;
        
        return ( 
            <div id="bookDetailContainer">
                {this.createAlert()}
                <List id="listInfo">
                    <ListItem>Format: Book</ListItem>
                    <ListItem>Title: {bookInfo.title}</ListItem>
                    <ListItem>Author: {bookInfo.author}</ListItem>
                    <ListItem>Publisher: {bookInfo.publisher}</ListItem>
                    <ListItem>Date Published: {bookInfo.pub_date}</ListItem>
                    <ListItem>ISBN: {bookInfo.isbn}</ListItem>
                    <ListItem>
                        <Link component="button" variant="title" onClick={this.checkIfUserOwnsBook}>Rate this book</Link>
                    </ListItem>
                </List>
                <Image id="bookCover" src={bookInfo.cover} alt="Image not available" rounded fluid></Image>
                <h3>Summary</h3>
                <hr></hr>
                <span>{bookInfo.description}</span>
                <h3>About the author</h3>
                <hr></hr>
                <span>{bookInfo.bio}</span>
                <h3>Ratings and Comments</h3>
                <hr></hr>
                <div id="reviewsContainer">
                    <span>Total reviews</span>
                    <StarsRating count={5} value={this.getTotalReviews()} size={30} edit={false}></StarsRating>
                    <hr></hr>
                    {this.displayReviews()}
                </div>
            </div> 
        );
    }
}
 
export default BookDetails;