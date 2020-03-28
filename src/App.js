import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Movies from "./components/movies";
import Rentals from "./components/rentals";
import Cutomers from "./components/customers";
import NotFound from "./components/not-found";
import MovieForm from "./components/movie-form";
import Login from "./components/login";
import Logout from "./components/logout";
import Register from "./components/register";
import ProtectedRoute from "./components/common/protected-route";
import NavBar from "./components/nav-bar";
import { getUser } from "./services/auth-service";
import Home from "./components/home";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getUser();
    this.setState({ user });
    console.log(user);
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer></ToastContainer>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/movies" component={Movies} exact></Route>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route path="/rentals">
              <Rentals />
            </Route>
            <Route path="/customers">
              <Cutomers />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/" component={Home} exact></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
