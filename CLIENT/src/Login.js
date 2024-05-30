import React, { Component } from "react";
import axios from "./axios";
import Spinner from "./Spinner";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    loading: false,
  };

  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, error: null });
  };

  handleClick = () => {
    this.setState({ loading: true });
    axios
      .post("users/login", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((result) => {
        this.setState({ loading: false });
        this.props.onLogin(result.data.token);
      })
      .catch((err) =>
        this.setState({
          error: err.response.data.error.message,
          loading: false,
        })
      );
  };

  render() {
    return (
      <div>
        {document.cookie && <Redirect to="/books" />}
        {this.state.error && (
          <div className="notification is-warning">{this.state.error}</div>
        )}
        {this.state.loading && <Spinner />}
        <div className="field">
          <label className="label">Имэйл</label>
          <input
            className="input"
            name="email"
            type="text"
            onChange={this.handleType}
          />
        </div>

        <div className="field">
          <label className="label">Нууц үг</label>
          <input
            className="input"
            name="password"
            type="password"
            onChange={this.handleType}
          />
        </div>

        <div className="field">
          <button className="button is-link" onClick={this.handleClick}>
            Нэвтрэх
          </button>
        </div>
      </div>
    );
  }
}
