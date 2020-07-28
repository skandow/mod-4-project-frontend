import React, { Component } from 'react'
import { connect } from 'react-redux'
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
                {this.renderNotes()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(Notes)