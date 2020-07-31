import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom'
import LoginContainer from './containers/LoginContainer'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import UserProfile from './components/user/UserProfile'
import EditUserForm from './components/user/EditUserForm'
import NotesContainer from './containers/NotesContainer'
// import UserNavBar from './components/user/UserNavBar';
import UserContainer from './containers/UserContainer'
import NewNoteForm from './components/notes/NewNoteForm'
import NotePage from './components/notes/NotePage'
import EditNoteForm from './components/notes/EditNoteForm'
import { loadNotes } from './actions/notes'
import { addUser } from './actions/user'
import {connect} from 'react-redux'

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    redirect: ''
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
    const token = localStorage.getItem("token")
    if (!token) {
        this.setState({
          noUser: true
        })
    } else {
      this.setState({
        redirect: ''
      })
      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
        fetch('http://localhost:3001/api/v1/profile', reqObj)
        .then(resp => resp.json())
        .then(data => {
          this.props.addUser(data.user.data.attributes)
          this.props.loadNotes(data.user.data.attributes.notes)
    })
    // if (this.props.user) {
    // this.props.loadNotes(this.props.user.notes)
    // this.setState({
    //   notesLoaded: true
    // })
    // }
  }}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
  }
  return (
    <Router>
    <div className="App">
      <div>
      {this.props.user ?
        <div className="App">
        <UserContainer />
        <Route exact path="/" component={UserProfile} />
        <Route exact path="/notes" render={() => <NotesContainer notes={this.props.user.notes} />} />
        <Route exact path="/profile/edit" render={() => <EditUserForm user={this.props.user} />} />
        <Route exact path="/notes/new" component={NewNoteForm} />
        {this.renderNoteRoutes()}
        {this.renderNoteEditRoutes()}
        </div>
      :
      <div className="App">
        <div className="App-header"><h1>FlatNote</h1>
        <h2>A place to write, save, and email notes for any and all purposes!</h2></div>
      <LoginContainer />
      <Route exact path="/login" component={Login} />
      <Route exact path="/sign_up" component={SignUp} />
      </div>}
      <div className="App-footer"><h1>Copywrite 2020</h1></div>
      </div>
    </div>
    </Router>
  )};
}

const mapStateToProps = state => {
  return {user: state.user, notes: state.notes}
}

const mapDispatchToProps = {
  loadNotes, addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
