import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

export default class loginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  render() {
    return (
      <div>
        <h1>Log In</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
  doSubmit = () => {
    console.log("submit");
  };
}
