import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteNote } from '../../actions/notes'
import EditNoteForm from './EditNoteForm'

const API = "http://localhost:3001/notes/"

class Note extends Component {
    state = {
        showEditForm: false
    }

    deleteNote = () => {
        const URL = API + this.props.note.id 
        const token = localStorage.getItem("token")
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteNote(this.props.note.id)
        })
    }

    toggleForm = () => {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    render() {
        console.log(this.props.note)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        const date = new Date(this.props.note.created_at).toLocaleDateString("en-US", options)
        console.log(date)
        return(
            <div>
                <h2>{this.props.note.title}</h2>
                <p>Date Written: {date}</p>
                <button onClick={this.toggleForm}>Edit this note</button>
                {this.state.showEditForm ? 
                <EditNoteForm note={this.props.note} toggleForm={this.toggleForm} />
                :
                null}
                <button onClick={this.deleteNote}>Delete this note</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    deleteNote
}

export default connect(null, mapDispatchToProps)(Note)