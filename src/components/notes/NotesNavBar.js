import React from 'react';
import { connect } from 'react-redux'
import { deleteUser } from '../../actions/user'

const NotesNavBar = props => {
  const myStyle = {
    border: "5px solid gray"
  }
  console.log(props)
  return (
    <div style={myStyle} className="ui menu inverted blue navbar">
      <div style={{cursor: "pointer", width: "190px"}} id="starred" className="ui item" onClick={props.handleFilters}>Show {props.starsOnly ? "All Notes" : "Starred Notes Only"}</div>
      <div style={{cursor: "pointer", width: "220px"}} id="dateSort" className="ui item" onClick={props.handleFilters}>Show {props.recentFirst ? "Latest" : "Most Recent"} Notes First</div>
      
      <div className="right item">
        <div className="ui icon input">
          <label style={{margin: "10px", fontSize: "20px"}}>Search By:</label>
          <input name="title" onChange={props.onChange} type="text" placeholder="title"/>
        </div>
        <div className="right item">
          <div className="ui icon input">
            <input name="content" onChange={props.onChange} type="text" placeholder="content"/>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
    deleteUser
}

export default connect(null, mapDispatchToProps)(NotesNavBar)