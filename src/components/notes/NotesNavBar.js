import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'

const NotesNavBar = props => {
  return (
    <div className="navbar">
      <NavLink to="/notes/new" exact>Create a New Note</NavLink>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser
}

export default connect(null, mapDispatchToProps)(NotesNavBar)