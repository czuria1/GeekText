import React, { Component } from 'react';
import { List, ListItem, Link } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './BookDetails.css'
import { Image } from 'react-bootstrap';
import StarsRating from 'stars-rating';
import { Link as RouterLink } from 'react-router-dom';
import ServerCall from "../ServerCall";
import ajaxme from "ajaxme";


class BookDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: [],
            openAlert: false,
            currentUser: props.currentUser,
            userID: props.userID,
            // Jimmy variables
            reviewComment: " ",
            reviewRating: -1,
            reviewAnon: false,
        }

        this.getBookReview = this.getBookReview.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeState = this.changeState.bind(this);
        // Jimmy Review methods binding
        this.handleRating = this.handleRating.bind(this);
        this.handleComment = this.handleComment.bind(this);
        this.handleAnon = this.handleAnon.bind(this);
        this.submitReview = this.submitReview.bind(this);
        this.canUserReviewBook = this.canUserReviewBook.bind(this);
    }

    componentDidMount() {
        this.getBookReview();
    }

    changeState(response) {
        this.setState({
            reviews: response
        });
    }

    getBookReview() {
        ServerCall("getBookReview", this.props.location.state.book.bookInfo.title, this.changeState);
    }

    displayReviews() {
        if (this.state.reviews.length !== 0 && this.state.reviews !== "0 results") {

            var reviewList = this.state.reviews.map(function (review, index) {
                // If the user chose to display their nickname
                if (review.anon == 0) {
                    return <div key={index} id="reviewContainer">
                        <StarsRating count={5} value={parseInt(review.rating)} size={30} edit={false}></StarsRating>
                        <span>{review.comment}</span>
                        <p></p>
                        <span>By: {review.nickname}</span>
                        <hr></hr>
                    </div>
                }
                // If the user chose to remain anonymous
                else {
                    return <div key={index} id="reviewContainer">
                        <StarsRating count={5} value={parseInt(review.rating)} size={30} edit={false}></StarsRating>
                        <span>{review.comment}</span>
                        <p></p>
                        <span>By: Anonymous User</span>
                        <hr></hr>
                    </div>
                }
            });
        }
        else {
            return <span>No reviews for this book</span>
        }

        return reviewList;
    }

    getTotalReviews() {
        if (this.state.reviews.length !== 0) {
            return parseInt(this.state.reviews[0].total) / this.state.reviews.length;
        }
        else {
            return 0;
        }
    }






    handleOpen = () => {
        this.setState({
            openAlert: true
        })
    }
    handleClose = () => {
        this.setState({
            openAlert: false
        })
    }
    handleComment = (event) => {
        this.setState({
            reviewComment: event.target.value
        });
    }
    handleRating = (newRating) => {
        this.setState({
            reviewRating: newRating
        });
    }

    handleAnon = (event) => {
        this.setState({
            reviewAnon: event.target.checked
        });
    }



    createAlert() {
        return <Dialog open={this.state.openAlert} onClose={this.handleClose}>
            <DialogTitle id="form-dialog-title">Write a review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Share your thoughts on the book below
                </DialogContentText>
                <TextField fullWidth onChange={this.handleComment} />
                <StarsRating value={this.state.reviewRating} count={5} color2="blue" size={30} edit={true} onChange={this.handleRating} name="rating" />
                <FormControlLabel control={
                    <Checkbox checked={this.state.reviewAnon} onChange={this.handleAnon} label="I want to remain anonymous" />}
                    label="I want to remain anonymous" />
            </DialogContent>
            <DialogActions>

                <Button onClick={this.handleClose} color="primary">
                    Cancel
          </Button>
                <Button onClick={this.submitReview} color="primary">
                    Submit
          </Button>
            </DialogActions>
        </Dialog>
    }


    // Jimmy - Review Functions
    submitReview() {
        ajaxme.post({
            url: "http://localhost:82/server.php/post",
            data:
                "method=submitReview" +
                "&comment=" +
                this.state.reviewComment +
                "&rating=" +
                `${this.state.reviewRating}` +
                "&book_id=" +
                `${this.state.bookInfo.id}` +
                "&user_id=" +
                `${this.state.userID}` +
                "&anon=" +
                `${this.state.reviewAnon}`,

            success: function (XMLHttpRequest) {
                console.log("success", XMLHttpRequest);
                if (XMLHttpRequest.responseText == null) {
                    console.log("null");
                } else {
                    console.log(XMLHttpRequest.responseText);
                }
            },
            error: function (XMLHttpRequest) {
                console.log("error", XMLHttpRequest);
            },
            abort: function (XMLHttpRequest) {
                console.log("abort", XMLHttpRequest);
            },
            loadstart: function (XMLHttpRequest) { },
            progress: function (XMLHttpRequest) { }
        });
    }


    canUserReviewBook() {
        if (this.state.currentUser === "") {
            alert("Please log in to review a book");
        }
        else {
            ajaxme.post({
                url: "http://localhost:82/server.php/post",
                data:
                    "method=doesUserOwnBook" +
                    "&title=" +
                    this.props.location.state.book.bookInfo.title +
                    "&userid=" +
                    this.state.userID,

                success: function (XMLHttpRequest) {
                    console.log("success", XMLHttpRequest);
                    if (XMLHttpRequest.responseText == 'false') {
                        alert("You cannot review this book since you do not own it.");
                    }
                    else if (XMLHttpRequest.responseText == "true") {
                        //The user is logged in and they own the book -> submitting review

                    }
                },
                error: function (XMLHttpRequest) {
                    console.log("error", XMLHttpRequest);
                },
                abort: function (XMLHttpRequest) {
                    console.log("abort", XMLHttpRequest);
                },
                loadstart: function (XMLHttpRequest) { },
                progress: function (XMLHttpRequest) { }
            });

        }
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
                    <Button onClick={this.handleOpen}>Write a review</Button>
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