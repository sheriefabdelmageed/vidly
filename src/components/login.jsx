import React from "react";
import { login, setToken, getUser } from "./../services/auth-service";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .required()
      .email()
      .label("email"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password")
  };

  doSubmit = async () => {
    try {
      const { data } = await login(this.state.data);
      setToken(data);
      console.log(this.props);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response.status === 400) toast.error(error.response.data);
      else if (error.response.status === 404) toast.error("Not Found");
      else toast.error("Something went wrong");
    }
  };

  render() {
    if (getUser()) return <Redirect to="/" />;

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
