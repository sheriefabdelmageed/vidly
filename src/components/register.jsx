import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { saveUser } from "./../services/user-service";
import { toast } from "react-toastify";
import { setToken } from "../services/auth-service";

class Register extends Form {
  state = {
    data: {
      email: "",
      name: "",
      password: ""
    },
    errors: {}
  };

  schema = {
    email: Joi.string()
      .email()
      .label("email")
      .required(),
    password: Joi.string()
      .required()
      .label("Password")
      .min(5),
    name: Joi.string()
      .required()
      .min(3)
  };

  doSubmit = async () => {
    try {
      debugger;
      const { data } = this.state;
      const res = await saveUser(data);
      setToken(res.headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex && ex.response && ex.response.status === 400)
        toast.error(ex.response.data);
      else if (ex && ex.response && ex.response.status === 404)
        toast.error("Not Found");
      else toast.error("Somthing went wrong");
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "text", true)}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default Register;
