import React, { Component } from 'react'
import {connect} from 'react-redux' 
import Notes from '../components/notes/Notes'
import NotesNavBar from '../components/notes/NotesNavBar'


class NotesContainer extends Component {
    state = {
        starFilter: false,
        recentFirst: false
    }

    renderFilters = () => {
        let notes = [...this.props.notes]
        let sortedNotes
        if (this.state.starFilter) {
            notes = notes.filter(note => note.starred === true)
        }
        if (this.state.recentFirst) {
            sortedNotes = notes.slice().sort((a, b) => {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)
                return dateB - dateA
            }) 
        } else {
            sortedNotes = notes.slice().sort((a, b) => {
                const dateA = new Date(a.created_at)
                const dateB = new Date(b.created_at)
                return dateA - dateB
        })}
        return sortedNotes
    } 

    handleFilters = event => {
        if (event.target.id === "starred") {
            this.setState({
                starFilter: !this.state.starFilter
            })
        } else {
            this.setState({
                recentFirst: !this.state.recentFirst
            })
        }
    }

    render() {
        const notes = this.renderFilters()
        let message 
        if (this.props.notes.length === 0) {
            message = "You haven't written any notes yet!"
        } else {
            message = ''
        }
        return (
            <div className="notes-container App-body">
                <NotesNavBar starsOnly={this.state.starFilter} recentFirst={this.state.recentFirst} handleFilters={this.handleFilters}/>
                <h1>My Notes:</h1>
                <h2 style={{color: "darkred"}}>
                    {message}
                </h2>
                <Notes notes={notes}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(NotesContainer)