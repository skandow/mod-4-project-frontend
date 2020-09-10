import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteNote } from '../../actions/notes'

const API = "https://flatnote-api.herokuapp.com/notes/"

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
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        const date = new Date(this.props.note.created_at).toLocaleDateString("en-US", options)
        return(
            <div>
                <h2>{this.props.note.starred ? <span style={{color: "yellow"}}>★</span> : null}{this.props.note.title}</h2>
                <p>Date Written: {date}</p>
                <button className="ui button" onClick={() => this.props.changeRedirect(`/notes/${this.props.note.id}`)}>Read This Note</button>
                <button className="ui button" onClick={() => this.props.changeRedirect(`/notes/${this.props.note.id}/edit`)}>Edit This Note</button>
            </div>
        )
    }
}

const mapDispatchToProps = {
    deleteNote
}

export default connect(null, mapDispatchToProps)(Note)