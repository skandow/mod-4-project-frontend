import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editNote } from '../../actions/notes'

const API = "http://localhost:3001/notes/"
const filledStar ="★"
const emptyStar="☆"

class EditNoteForm extends Component {
    state = {
        title: this.props.note.title,
        content: this.props.note.content,
        starred: this.props.note.starred,
        redirect: null
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStarred = () => {
        this.setState({
            starred: !this.state.starred
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const URL = API + this.props.note.id 
        const token = localStorage.getItem("token")
        const payload = {
            title: this.state.title,
            content: this.state.content,
            starred: this.state.starred
        }
        this.setState({
            redirect: "/notes"
        })
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.editNote(data.data.attributes);
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
        <div>
            
            <form className="ui form" id="edit-note" onSubmit={this.handleSubmit}>
            <h1>Edit Your Note:</h1>
            <p></p>
            <span > <span style={{cursor:"pointer"}} onClick={this.handleStarred}>{this.state.starred ?
                <span style={{color: "yellow"}}>{filledStar}</span>
                :
                emptyStar
                }
                </span>
                <div style={{padding: "0px", display: "inline"}}>{this.state.starred ? " Unstar this Note:" : " Star this Note:"}</div>
                </span>
                <br></br>
                <br></br>
                <div className="field">
                    <label>Title:</label>
                    <input type='text' name="title" value={this.state.title} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label>Content:</label>
                    <textarea name="content" rows="5" value={this.state.content} onChange={this.handleChange}></textarea>
                </div>
                <button className="ui button" type="submit">Submit your edit</button>
            </form>
        </div>
        )
    }
}

const mapDispatchToProps = {
    editNote
}

export default connect(null, mapDispatchToProps)(EditNoteForm)