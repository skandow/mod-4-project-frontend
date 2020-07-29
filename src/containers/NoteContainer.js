import React, { Component } from 'react'
import Note from '../components/notes/Note'


class NoteContainer extends Component {
    
    
    render() {
        const myStyle = {
            border: '10px solid white',
            padding: '10px',
            color: 'white',
            backgroundColor: "gray"}
        return (
            <div style={myStyle} className="note-container ui eight wide column">
                <Note note={this.props.note} changeRedirect={this.props.changeRedirect}/>
            </div>
        )
    }
}

export default NoteContainer