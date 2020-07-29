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
import NotePage from './components/notes/NotePage'
import EditNoteForm from './components/notes/EditNoteForm'
import { loadNotes } from './actions/notes'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    notesLoaded: false
  }

  renderNoteRoutes = () => {
    return this.props.notes.map(note => {
      return <Route key={note.id} exact path={`/notes/${note.id}`} render={() => <NotePage note={note} />} />
    })
  }

  renderNoteEditRoutes = () => {
    return this.props.notes.map(note => {
      return <Route key={note.id} exact path={`/notes/${note.id}/edit`} render={() => <EditNoteForm note={note} />} />
    })
  }

  componentDidMount() {
    if (this.props.user) {
    this.props.loadNotes(this.props.user.notes)
    this.setState({
      notesLoaded: true
    })
    }
  }

  render() {
  return (
    <Router>
    <div className="App">
    {/* <header className="App-header"><h1 className="App-name">Flatnote</h1></header> */}
      <div>
      {this.props.user ?
        <div>
        <UserNavBar />
        <Route exact path="/profile" component={UserProfile} />
        <Route exact path="/notes" render={() => <NotesContainer notes={this.props.user.notes} />} />
        <Route exact path="/profile/edit" render={() => <EditUserForm user={this.props.user} />} />
        <Route exact path="/notes/new" component={NewNoteForm} />
        {this.renderNoteRoutes()}
        {this.renderNoteEditRoutes()}
        </div>
      :
      <div className="App-header">
        <div><h1 className="App-name">Flatnote</h1></div>
      <LoginContainer />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign_up" component={SignUp} />
      </div>}
      </div>
    </div>
    </Router>
  )};
}

const mapStateToProps = state => {
  return {user: state.user, notes: state.notes}
}

const mapDispatchToProps = {
  loadNotes
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
