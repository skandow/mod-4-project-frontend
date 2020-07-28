import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NewNoteForm from './NewNoteForm'
import Note from './Note'

class Notes extends Component {
    renderNotes = () => {
        return this.props.notes.map(note => {
            return <Note key={note.id} note={note} />
        })
    }

    render() {
        return(
            <div>
                <NewNoteForm />
                {this.renderNotes()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(Notes)