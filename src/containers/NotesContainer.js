import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadNotes, deleteNotes } from '../actions/notes'
import Notes from '../components/notes/Notes'

class NotesContainer extends Component {
    render() {
        console.log(this.props.notes)
        this.props.loadNotes(this.props.notes)
        return (
            <div className="notes-container">
                <Notes />
            </div>
        )
    }
}

const mapDispatchToProps = {
    loadNotes
}

export default connect(null, mapDispatchToProps)(NotesContainer)