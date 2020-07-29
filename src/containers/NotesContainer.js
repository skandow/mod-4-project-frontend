import React, { Component } from 'react'
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


export default NotesContainer