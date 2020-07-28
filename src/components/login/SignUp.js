import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addUser } from '../../actions/user'

const API = "http://localhost:3001/api/v1/users"

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            age: '',
            gender: '',
            image_url: '',
            errorMessage: '',
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillUnmount() {
        this.setState({
            username: '',
            password: '',
            email: '',
            age: '',
            gender: '',
            image_url: ''
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        if ((this.state.username) && (this.state.password) && (this.state.email) && (this.state.gender) && (this.state.image_url)) {
            if (parseInt(this.state.age, 10) > 18) {
            const payload = { user: {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            age: parseInt(this.state.age, 10),
            gender: this.state.gender,
            image_url: this.state.image_url
        }}
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        fetch(API, reqObj)
        .then((resp) => {
            if(resp.status === 406) {
                throw Error("Usernames must be unique")
            } else {
                this.setState({
                    redirect: '/profile'
                })
                return resp.json()
            }
            })
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.addUser(data.user.data.attributes)
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    } else this.setState({
        errorMessage: "You must be 18 or older to use this site."
    })} else this.setState({
        errorMessage: "No fields can be left blank."
    })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form onSubmit={this.handleSubmit} className="log-in">
                <h1>Enter Your Information To Create Your Account:</h1>
                {this.state.errorMessage ? 
                <p style={{color: "red"}}>{this.state.errorMessage}</p>
                :
                null}
                <input onChange={this.handleChange} type="text" name="username" value={this.state.username} placeholder="username" /><br></br>
                <input onChange={this.handleChange} type="password" name="password" value={this.state.password} placeholder="password" /><br></br>
                <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="email" /><br></br>
                <input onChange={this.handleChange} type="text" name="age" value={this.state.age} placeholder="age" /><br></br>
                <input onChange={this.handleChange} type="text" name="gender" value={this.state.gender} placeholder="gender" /><br></br>
                <input onChange={this.handleChange} type="text" name="image_url" value={this.state.image_url} placeholder="image_url" /><br></br>
                <input type="submit" />
            </form>
        )
    }
}
const mapDispatchToProps = {
    addUser
}
  
export default connect(null, mapDispatchToProps)(SignUp)