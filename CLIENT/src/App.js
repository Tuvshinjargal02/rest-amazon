import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "./axios";
import Login from "./Login";
import Books from "./Books";
import BookDetail from "./BookDetail";
import NavBar from "./NavBar";
import Spinner from "./Spinner";

export default class App extends Component {
  state = {
    token: null,
  };

  handleLogin = (token) => {
    this.setState({ token });
    localStorage.setItem("token", token);
    this.router.history.push("/books");
  };

  handleLogout = () => {
    // localStorage.removeItem("token");
    // this.setState({ token: null });
    // this.router.history.push("/");

    // document.cookie =
    //   "amazon-token=; expires=" +
    //   new Date(Date.now() - 360 * 24 * 60 * 60 * 1000);

    axios
      .get("users/logout")
      .then((result) => this.router.history.push("/"))
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Router ref={(router) => (this.router = router)}>
        <NavBar onLogout={this.handleLogout} />
        <div className="container">
          <Switch>
            <Route exact path="/books" component={Books} />
            <Route path="/books/:id" component={BookDetail} />
            <Route
              path="/"
              render={() => <Login onLogin={this.handleLogin} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
