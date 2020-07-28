import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadNotes} from '../actions/notes'
import Notes from '../components/notes/Notes'


class NotesContainer extends Component {
    render() {
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