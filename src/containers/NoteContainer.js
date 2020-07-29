import React, { Component } from 'react'
import Note from '../components/notes/Note'


class NoteContainer extends Component {

    render() {
        return (
            <div className="note-container">
                <Note note={this.props.note} changeRedirect={this.props.changeRedirect}/>
            </div>
        )
    }
}

export default NoteContainer