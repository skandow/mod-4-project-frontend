import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'

const UserNavBar = props => {
  return (
    <div className="navbar">
      <NavLink to="/profile" exact>My Profile</NavLink>
      <NavLink to="/profile/edit" exact>Edit My Profile</NavLink>
      <NavLink to="/notes" exact>My Notes</NavLink>
      <NavLink to="/notes/new" exact>Create a New Note</NavLink>
      <NavLink to="/" exact onClick={props.deleteUser}>Log Out</NavLink>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser
}

export default connect(null, mapDispatchToProps)(UserNavBar)