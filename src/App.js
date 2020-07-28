import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import LoginContainer from './containers/LoginContainer'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import UserProfile from './components/user/UserProfile'
import EditUserForm from './components/user/EditUserForm'
import NotesContainer from './containers/NotesContainer'
import UserNavBar from './components/user/UserNavBar';
import NewNoteForm from './components/notes/NewNoteForm'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
  return (
    <Router>
    <div className="App">
      {this.props.user ?
      <Router>
      <div>
        <UserNavBar />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/notes" render={() => <NotesContainer notes={this.props.user.notes} />} />
        <Route exact path="/profile/edit" render={() => <EditUserForm user={this.props.user} />} />
        <Route exact path="/notes/new" component={NewNoteForm} />
        </div>
      </Router>
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
  return {user: state.user}
}

export default connect(mapStateToProps)(App);
