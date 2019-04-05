import React, { Component } from 'react';
import { List, ListItem, Link, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { Image } from 'react-bootstrap';
import StarsRating from 'stars-rating';
import {Link as RouterLink} from 'react-router-dom';
import ServerCall from "../ServerCall";
import styled from "styled-components";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox, FormControlLabel} from '@material-ui/core';

const BookCover = styled(Image)`
    padding-left: 200px;
`;

const Heading = styled.h3`
    padding-top: 100px; 
`;

class BookDetails extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            reviews: [],
            openAlert: false,
            currentUser: props.currentUser,
            userID: props.userID
        }
        
        this.getBookReview = this.getBookReview.bind(this);
        this.checkIfUserOwnsBook = this.checkIfUserOwnsBook.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.changeState = this.changeState.bind(this);
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
        if (this.state.reviews.length !== 0 && this.state.reviews !== "0 results")
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

    checkIfUserOwnsBook(e) {
        console.log("here");
        
        if (this.state.currentUser === "")
        {
            this.setState({
                openAlert: true
            })
            e.preventDefault();
        }
        else
        {
            var response = ServerCall("doesUserOwnBook", this.props.location.state.book.bookInfo.title + ";" + this.state.userID);

            if (response[0].title !== this.props.location.state.book.bookInfo.title)
            {
                e.preventDefault();
                alert("you dont own it")
            }
        }
    }

    handleClose() {
        this.setState({
            openAlert: false
        })
    }

    createAlert() {
        return <Dialog open={this.state.openAlert} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle>You're not logged in</DialogTitle>
                    <DialogContent>
                        <DialogContentText >
                            Would you like to login to rate this book?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            <Link component={RouterLink} to="/login" variant="title">Yes</Link>
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            No
                        </Button>
                    </DialogActions>
        </Dialog>;
    }

    render() { 
        var bookInfo = this.props.location.state.book.bookInfo;
        
        return ( 
            <div id="bookDetailContainer">
                {this.createAlert()}
                <List style={{ float: 'right', paddingRight: '500px'}}>
                    <ListItem>Format: Book</ListItem>
                    <ListItem>Title: {bookInfo.title}</ListItem>
                    <ListItem>Author: {bookInfo.author}</ListItem>
                    <ListItem>Publisher: {bookInfo.publisher}</ListItem>
                    <ListItem>Date Published: {bookInfo.pub_date}</ListItem>
                    <ListItem>ISBN: {bookInfo.isbn}</ListItem>
                    <ListItem>
                        <Link component={RouterLink} to="/reviews" variant="title" onClick={this.checkIfUserOwnsBook}>Rate this book</Link>
                    </ListItem>
                </List>
                <BookCover src={bookInfo.cover} alt="Image not available" rounded fluid></BookCover>
                <ExpansionPanel style={{marginTop: '100px'}}>
                    <ExpansionPanelSummary>Summary</ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>{bookInfo.description}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary >About The Author</ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>{bookInfo.bio}</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary >Ratings And Comments</ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{display: 'block'}}>
                        {this.displayReviews()}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div> 
        );
    }
}
 
export default BookDetails;