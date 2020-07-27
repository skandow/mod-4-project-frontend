import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editUser } from '../../actions/user'

const API = "http://localhost:3001/api/v1/users/"

class EditUserForm extends Component {
    state = {
        email: this.props.user.email,
        gender: this.props.user.gender,
        image_url: this.props.user.image_url
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        const URL = API + this.props.user.id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: '/profile'
        })
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.editUser(data.data.attributes);
            this.props.renderForm()
        })
    }

    render() {
        // if (this.state.redirect) {
        //     return <Redirect to={this.state.redirect} />
        // }
        return(
            <form onSubmit={this.handleSubmit}>
                <label>Email address:</label>
                <input type='text' name="email" value={this.state.email} onChange={this.handleChange}/>
                <label>Gender:</label>
                <input type='text' name="gender" value={this.state.gender} onChange={this.handleChange} />
                <label>Image Source:</label>
                <input type='text' name="image_url" value={this.state.image_url} onChange={this.handleChange} />
                <input type="submit" />
            </form>
        )
    }
}

const mapDispatchToProps = {
    editUser
}

export default connect(null, mapDispatchToProps)(EditUserForm)