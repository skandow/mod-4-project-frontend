import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addUser } from '../../actions/user'

const API = "http://localhost:3001/api/v1/login"

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
            password: '',
            redirect: '/profile'
        })
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        fetch(API, reqObj)
        .then(resp => resp.json())
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.addUser(data.user.data.attributes)
        })
        .catch(error => console.log(error))
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form onSubmit={this.handleSubmit} className="log-in">
                <h1>Please Log In:</h1>
                {this.state.errorMessage ? 
                <p>The username or password is incorrect</p>
                :
                null}
                <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="username" /><br></br>
                <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password" /><br></br>
                <input type="submit" />
            </form>
        )
    }
}

const mapDispatchToProps = {
    addUser
}
  
export default connect(null, mapDispatchToProps)(Login)