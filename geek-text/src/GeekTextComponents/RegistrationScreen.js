import React, { Component } from "react";
import Registration from "./Registration";
import ajaxme from "ajaxme";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRegistrationSuccess: false,
      username: "",
      fname: "",
      lname: "",
      nickname: "",
      email: "",
      password_1: "",
      password_2: "",
      userData: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.registerButtonClicked = this.registerButtonClicked.bind(this);
  }

  handleSubmit(event) {
    this.setState({
      username: event.target.value,
      fname: event.target.value,
      lname: event.target.value,
      nickname: event.target.value,
      email: event.target.value,
      password_1: event.target.value,
      password_2: event.target.value
    });
  }

  registerButtonClicked() {
    ajaxme.post({
      url: "http://localhost:82/server.php/post",
      data:
        "method=registerUser&username=" +
        `${this.state.username}` +
        "&fname=" +
        `${this.state.fname}` +
        "&lname=" +
        `${this.state.lname}` +
        "&nickname=" +
        `${this.state.nickname}` +
        "&email=" +
        `${this.state.email}` +
        "&password_1=" +
        `${this.state.password_1}` +
        "&password_2=" +
        `${this.state.password_2}`,
      success: function(XMLHttpRequest) {
        this.setState({
          userData: JSON.parse(XMLHttpRequest.responseText)
        });
        console.log("success", XMLHttpRequest);
      }.bind(this),
      error: function(XMLHttpRequest) {
        console.log("error", XMLHttpRequest);
      },
      abort: function(XMLHttpRequest) {
        console.log("abort", XMLHttpRequest);
      },
      loadstart: function(XMLHttpRequest) {},
      progress: function(XMLHttpRequest) {}
    });
  }

  render() {
    return (
      <Registration
        handleSubmit={this.handleSubmit}
        registerButtonClicked={this.registerButtonClicked}
      />
    );
  }
}

export default RegistrationScreen;
