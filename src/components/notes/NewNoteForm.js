import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addNote } from '../../actions/notes'
import emailjs from 'emailjs-com'

const API = "http://localhost:3001/notes"
const filledStar ="★"
const emptyStar="☆"

class NewNoteForm extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            content: '',
            starred: false,
            errorMessage: '',
            redirect: null,
            email: false
        }
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

    sendEmail = (templateId, variables) => {
        emailjs.send("default_service", templateId, variables, "user_1GnGr1Ktl736HBQuOWgwF")
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        if ((this.state.title) && (this.state.content)) {
            const payload = { note: {
            title: this.state.title,
            content: this.state.content,
            starred: this.state.starred,
            user_id: this.props.user.id
        }}
        if (this.state.email) {
        const templateId = "template_eRb8U9w6"
        const variables = {
            message_html: this.state.content,
            title: this.state.title,
            name: this.props.user.username,
            email: this.props.user.email
        }
        this.sendEmail(templateId, variables)
        }
        this.setState({
            title: '',
            content: '',
            starred: false,
            email: false,
            redirect: '/notes'
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

    toggleEmail = () => {
        this.setState({
            email: !this.state.email
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                
            <form className="ui error form" id="new-note-form" onSubmit={this.handleSubmit}>
            <h1>Create a New Note:</h1>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                :
                null}
                <span style={{cursor:"pointer"}} onClick={this.handleStarred}>Star This Note: {this.state.starred ?
                <span style={{color: "yellow"}}>{filledStar}</span>
                :
                emptyStar
                }
                </span>
                <br></br>
                <br></br>
                <div className="field">
                    <label>Title:</label>
                    <input onChange={this.handleChange} type="text" name="title" value={this.state.title} placeholder="title" />
                </div>
                <div className="field">
                    <label>Content:</label>
                    <textarea onChange={this.handleChange} rows="5" name="content" value={this.state.content} placeholder="write your note here"></textarea>
                </div>
                <div className="ui field">
                    <div className="ui checkbox">
                        <input type="checkbox" onChange={this.toggleEmail}/>
                        <label>Email a copy of this note.</label>
                    </div>
                </div>
                <button className="ui button" type="submit">Submit your new note</button>
            </form>
            </div>
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