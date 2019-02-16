import React, { Component } from "react";

class Review extends Component {
  render() {
    return (
      <React.Fragment>
        <form action="/test.php" method="POST">
          <h2>Create a review</h2>
          Rating:
          <select name="rating">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <br />
          <textarea name="review" />
          <br />
          <input type="submit" value="Submit" />
          <input type="hidden" name="form_submitted" value="1" />
        </form>
      </React.Fragment>
    );
  }
}

export default Review;
