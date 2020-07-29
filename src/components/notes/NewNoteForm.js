import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addNote } from '../../actions/notes'

const API = "http://localhost:3001/notes"

class NewNoteForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            completed: false,
            starred: false,
            errorMessage: '',
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        if ((this.state.title) && (this.state.content)) {
            const payload = { note: {
            title: this.state.title,
            content: this.state.content,
            completed: this.state.completed,
            starred: this.state.starred,
            user_id: this.props.user.id
        }}
        this.setState({
            title: '',
            content: '',
            completed: false,
            starred: false,
        })
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch(API, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.addNote(data.data.attributes)
        })
        .catch(error => console.log(error))
    } else this.setState({
        errorMessage: "No fields can be left blank."
    })
    }
    
    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect} />
        // }
        return (
            <form onSubmit={this.handleSubmit} className="new-note-form">
                <h1>Create a New Note:</h1>
                {this.state.errorMessage ? 
                <p style={{color: "red"}}>{this.state.errorMessage}</p>
                :
                null}
                <input onChange={this.handleChange} type="text" name="title" value={this.state.title} placeholder="title" /><br></br>
                <input onChange={this.handleChange} type="textarea" name="content" value={this.state.content} placeholder="write your note here" /><br></br>
                <input type="submit" />
            </form>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = {
    addNote
}
  
export default connect(mapStateToProps, mapDispatchToProps)(NewNoteForm)