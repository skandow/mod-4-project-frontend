import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { deleteNote } from '../../actions/notes'
import EditNoteForm from './EditNoteForm'

const API = "http://localhost:3001/notes/"

class NotePage extends Component {
    state = {
        redirect: null,
        deleted: false
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
        this.setState({
            deleted: true
        })
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteNote(this.props.note.id)
        })
    }

    showEditForm = () => {
        this.setState({
            redirect: `/notes/${this.props.note.id}/edit`
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        if (this.state.deleted) {
            return <Redirect to="/notes" />
        }
        console.log(this.props.note)
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        const date = new Date(this.props.note.created_at).toLocaleDateString("en-US", options)
        console.log(date)
        return(
            <div>
                <h2>{this.props.note.title}</h2>
                <p>Date Written: {date}</p>
                <p>{this.props.note.content}</p>
                <button onClick={this.showEditForm}>Edit this note</button>
                <button onClick={this.deleteNote}>Delete this note</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    deleteNote
}

export default connect(null, mapDispatchToProps)(NotePage)