import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LoginContainer from './containers/LoginContainer'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import UserProfile from './components/user/UserProfile'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
  return (
    <Router>
    <div className="App">
      {this.props.users[0] ?
      <Route exact path="/profile" component={UserProfile} />
      :
      <div>
      <LoginContainer />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign_up" component={SignUp} />
      </div>}
    </div>
    </Router>
  )};
}

const mapStateToProps = state => {
  return {users: state.users}
}

export default connect(mapStateToProps)(App);
