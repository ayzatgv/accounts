import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { setLogin } from './Actions/LoginAction';

import Login from './Components/Login';
import Register from './Components/Register';
import Navigation from './Components/Navigation';
import NotFound from './Components/NotFound';
import Main from './Components/Main';
import GetUser from './Components/GetUser';
import DetailUser from './Components/DetailUser';

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('Token') != null) {
      this.props.setLogin(true);
    }
    else {
      this.props.setLogin(false);
    }
  }

  render() {
    return (
      (this.props.Login === true) ?
        (
          <div>
            <Router >
              <Navigation />
              <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/user" exact component={GetUser} />
                <Route path="/user/detail/:id" exact component={DetailUser} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </div>
        ) :
        <div>
          <Router >
            <Switch>
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/" component={Login} />
            </Switch>
          </Router>
        </div>
    );
  }
}

const mapStateToProps = state => ({
  Login: state.Login
});

export default connect(mapStateToProps, { setLogin })(App);