import React, { Component } from 'react';
import './test.css';
import request from 'superagent'

class Counter extends Component{
  

  constructor(props) {
  super(props);
  this.state = {name: ""};
  this.updateState = this.updateState.bind(this)
  this.searchBook = this.searchBook.bind(this)
  }

  

  searchBook()
  {
    request.get("https://www.googleapis.com/books/v1/volumes").query({ q: this.state.name+"inauthor", maxResults: 40}).then((data) => {console.log(data)})
     
  }

  updateState(event)
  {
   this.setState({
     name: event.target.value
   });
  }

  render() {
    return (
      <div className="container">
        <input type="text" onChange={this.updateState}/>
        <button onClick={this.searchBook}>Search</button>
        <form onSubmit={this.searchBook}>
        
        </form>
      </div>
    );
  }
}







export default Counter;