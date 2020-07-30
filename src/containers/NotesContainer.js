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
        // console.log("notes pre filter", notes)
        if (this.state.starFilter) {
            notes = notes.filter(note => note.starred === true)
        }
        if (this.state.recentFirst) {
            notes = notes.reverse()
        }
        // console.log("notes post-filter", notes)
        return notes
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
        // console.log(this.state)
        const notes = this.renderFilters()
        return (
            <div className="notes-container App-body">
                <NotesNavBar starsOnly={this.state.starFilter} recentFirst={this.state.recentFirst} handleFilters={this.handleFilters}/>
                <h1>My Notes:</h1>
                <Notes notes={notes}/>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { notes: state.notes }
}

export default connect(mapStateToProps)(NotesContainer)