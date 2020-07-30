import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'

const NotesNavBar = props => {
  const myStyle = {
    border: "5px solid gray"
  }
  console.log(props)
  return (
    <div style={myStyle} className="ui menu inverted blue">
      <div style={{cursor: "pointer", width: "190px"}} id="starred" className="ui item" onClick={props.handleFilters}>Show {props.starsOnly ? "All Notes" : "Starred Notes Only"}</div>
      <div style={{cursor: "pointer", width: "220px"}} id="dateSort" className="ui item" onClick={props.handleFilters}>Show {props.recentFirst ? "Latest" : "Most Recent"} Notes First</div>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser
}

export default connect(null, mapDispatchToProps)(NotesNavBar)