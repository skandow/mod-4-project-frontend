import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadNotes} from '../actions/notes'
import Notes from '../components/notes/Notes'


class NotesContainer extends Component {
    render() {
        return (
            <div className="notes-container">
                <Notes />
            </div>
        )
    }
}

// const mapDispatchToProps = {
//     loadNotes
// }

export default NotesContainer