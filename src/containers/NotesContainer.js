import React, { Component } from 'react'
import Notes from '../components/notes/Notes'


class NotesContainer extends Component {
    render() {
        return (
            <div className="notes-container App-body">
                <h1>My Notes:</h1>
                <Notes />
            </div>
        )
    }
}


export default NotesContainer