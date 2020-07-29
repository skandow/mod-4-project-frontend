import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editNote } from '../../actions/notes'

const API = "http://localhost:3001/notes/"

class EditNoteForm extends Component {
    state = {
        title: this.props.note.title,
        content: this.props.note.content,
        redirect: null
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const URL = API + this.props.note.id 
        const token = localStorage.getItem("token")
        const payload = {
            title: this.state.title,
            content: this.state.content,
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
            <form onSubmit={this.handleSubmit}>
                <label>Title:</label>
                <input type='text' name="title" value={this.state.title} onChange={this.handleChange}/>
                <label>Content:</label>
                <input type='textarea' name="content" value={this.state.content} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        </div>
        )
    }
}

const mapDispatchToProps = {
    editNote
}

export default connect(null, mapDispatchToProps)(EditNoteForm)