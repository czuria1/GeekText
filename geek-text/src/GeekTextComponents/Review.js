import React, { Component } from "react";
import ajaxme from "ajaxme";
import BookList from "./BookList";

class Review extends Component {
  //Used to connect to the server
  constructor(props) {
    super(props);
    this.state = {
      text: "", //Contains the text contained in a review
      rating: -1
    };
    //Bind the methods to the component
    this.submitButtonClicked = this.submitButtonClicked.bind(this);
    this.handleRating = this.handleRating.bind(this);
    this.handleReview = this.handleReview.bind(this);
  }

  handleRating(event) {
    this.setState({
      rating: event.target.value
    });
  }

  handleReview(event) {
    this.setState({
      text: event.target.value
    });
  }

  submitButtonClicked() {
    //Used to connect to the server
    ajaxme.post({
      url: "http://localhost:82/server.php/post",
      data:
        "method=submitReview" +
        "&review=" +
        `${this.state.text}` +
        "&rating=" +
        `${this.state.rating}`,

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

  render() {
    return (
      <div align="center" id="reviewSection">
        <form>
          <h2>Create a review</h2>
          Rating:
          <select name="rating" onChange={this.handleRating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <label>
            <input type="checkbox" name="anon" value="true"> I would like to remain anonymous</input>
          </label>
          <br />
          <textarea name="review" onChange={this.handleReview} />
          <br />
          <button
            type="button"
            id="submitReviewButton"
            onClick={this.submitButtonClicked}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Review;
