import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'
import { clearNotes } from '../../actions/notes'

const UserNavBar = props => {
  const myStyle = {
    borderBottom: "5px solid gray",
    borderLeft: "5px solid gray",
    borderRight: "5px solid gray"
  }

  const handleLogOut = () => {
    props.deleteUser();
    props.clearNotes();
    localStorage.removeItem('token')
  }

  return (
    <div style={myStyle} className="navbar ui inverted red menu">
      <NavLink className="ui item" to="/" exact>My Profile</NavLink>
      <NavLink className="ui item" to="/profile/edit" exact>Edit My Profile</NavLink>
      <NavLink className="ui item" to="/notes" exact>My Notes</NavLink>
      <NavLink className="ui item" to="/notes/new" exact>Create a New Note</NavLink>
      <NavLink className="ui item" to="/" exact onClick={handleLogOut}>Log Out</NavLink>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser,
    clearNotes
}

export default connect(null, mapDispatchToProps)(UserNavBar)