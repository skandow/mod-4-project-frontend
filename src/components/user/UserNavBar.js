import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'

const UserNavBar = props => {
  const myStyle = {
    border: "5px solid gray",
    margin: "50px"
  }
  return (
    <div style={myStyle} className="navbar ui menu">
      <NavLink className="ui item" to="/profile" exact>My Profile</NavLink>
      <NavLink className="ui item" to="/profile/edit" exact>Edit My Profile</NavLink>
      <NavLink className="ui item" to="/notes" exact>My Notes</NavLink>
      <NavLink className="ui item" to="/notes/new" exact>Create a New Note</NavLink>
      <NavLink className="ui item" to="/" exact onClick={props.deleteUser}>Log Out</NavLink>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser
}

export default connect(null, mapDispatchToProps)(UserNavBar)