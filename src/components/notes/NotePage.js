import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editNote, deleteNote } from '../../actions/notes'

const API = "http://localhost:3001/notes/"
const filledStar ="★"
const emptyStar="☆"

class NotePage extends Component {
    state = {
        redirect: null,
        deleted: false,
        starred: this.props.note.starred
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

    star = () => {
        const URL = API + this.props.note.id
        const token = localStorage.getItem("token")
        const payload = {
            starred: !this.props.note.starred
        }
        this.setState({
            starred: !this.state.starred
        })
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.editNote(data.data.attributes);
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        if (this.state.deleted) {
            return <Redirect to="/notes" />
        }
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        const date = new Date(this.props.note.created_at).toLocaleDateString("en-US", options)
        return(
            <div className="notecard">
                <h2><span style={{cursor:"pointer"}} onClick={this.star}>{this.state.starred ?
                <span style={{color: "yellow"}}>{filledStar}</span>
                :
                emptyStar
                }
                </span>{this.props.note.title}</h2>
                <p className="date">{date}</p>
                <p className="note-content">{this.props.note.content}</p>
                <button onClick={this.showEditForm}>Edit this note</button>
                <button onClick={this.deleteNote}>Delete this note</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    deleteNote,
    editNote
}

export default connect(null, mapDispatchToProps)(NotePage)