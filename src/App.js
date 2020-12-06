import React, { Component } from "react";
import { Route } from "react-router";
import { Switch } from "react-router-dom";
import { BrowserRouter, Redirect } from "react-router-dom";
import "./App.css";

import { firebaseAuth } from "./firebase";

import RaigamLayout from "./ui/Layouts/Raigam";
import WijayaLayout from "./ui/Layouts/Wijaya";
import Login from "./ui/Login/Login";
import LoadingScreen from "./ui/LoadingScreen/LoadingScreen";
import * as actions from "./store/actions/index";
import { connect } from "react-redux";

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentUser: null,
      loading: true
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user, loading: false});
      } else {
        this.setState({ currentUser: null, loading: false });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth && this.unsubscribeFromAuth();
  }

  render() {
    if (this.state.loading) {
      return <LoadingScreen />;
    }

    return (
      <div className="App">
        <BrowserRouter>
          {this.state.currentUser ? <Redirect to="/wijaya/dashboard" /> : null}
          {this.state.currentUser ? null : <Redirect  to='/login'/>}
          <Switch>
            <Route
              path="/add-user"
              exact
              component={() => <Login isSignUp={true} formTitle="Add User" />}
            />
            <Route
              path="/login"
              exact
              component={() => <Login isSignUp={false} formTitle="Log In" />}
            />
            <Route path="/wijaya/dashboard" exact component={WijayaLayout} />
            <Route
              path="/wijaya/day-wise-summery"
              exact
              component={WijayaLayout}
            />
            <Route path="/raigam/dashboard" exact component={RaigamLayout} />
            <Redirect from="/raigam" to="/raigam/dashboard" />
            {this.state.currentUser ? <Redirect from="/" to="/wijaya/dashboard" /> : null }
            <Redirect from="/wijaya" to="/wijaya/dashboard" />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return {
//     loading: state.auth.loading,
//     uid: state.auth.userId
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     authSuccess: (token, uid)=> dispatch(actions.authSuccess(token, uid)),
//     authStart: ()=> dispatch(actions.authStart()),
//     notAuth: ()=> dispatch(actions.authFail())
//   }
// }

//export default connect(mapStateToProps,mapDispatchToProps)(App);
export default App;
