import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addUser } from '../../actions/user'
import { loadNotes } from '../../actions/notes'

const API = "https://flatnote-api.herokuapp.com/api/v1/login"

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            errorMessage: false,
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
        const payload = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({
            username: '',
            password: ''
        })
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        fetch(API, reqObj)
        .then((resp) => {
            if(resp.status === 401) {
                throw Error("The username or password is incorrect")
            } else {
                this.setState({
                    redirect: '/'
                })
                return resp.json()
            }
            })
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.addUser(data.user.data.attributes)
            this.props.loadNotes(data.user.data.attributes.notes)
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form onSubmit={this.handleSubmit} className="log-in ui error form">
                <h1>Please Log In:</h1>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>The username or password is incorrect</p>
                    </div>
                </div>
                :
                null}
                <div className="field">
                    <label style={{color: "white"}}>Username:</label>
                    <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="username" />
                </div>
                <div className="field">
                    <label style={{color: "white"}}>Password</label>
                    <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password" />
                </div>
                <button type="submit" className="ui button">Log In</button>
            </form>
        )
    }
}

const mapDispatchToProps = {
    addUser,
    loadNotes
}
  
export default connect(null, mapDispatchToProps)(Login)