import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import NoteContainer from '../../containers/NoteContainer'

class Notes extends Component {
    state = {
        redirect: null
    }
    
    renderNotes = () => {
        return this.props.notes.map(note => {
            return <NoteContainer key={note.id} note={note} changeRedirect={this.changeRedirect} />
        })
    }

    changeRedirect = url => {
        this.setState({
            redirect: url
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
            <div className = "ui grid container">
                {this.renderNotes()}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(Notes)