import React, { Component } from "react";

class Review extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Create a review</h1>
        <div>
          <form action="/test_page.php">
            <select>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br />
            <textarea name="comment" />
            <br />
            <button>Submit</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default Review;
