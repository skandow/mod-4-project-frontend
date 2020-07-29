import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editUser, deleteUser } from '../../actions/user'

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
        })
    }

    deleteUser = () => {
        const URL = API + this.props.user.id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: "/"
        })
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.deleteUser()
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
        <div>
            <form className="ui form" id="edit-user" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Email address:</label>
                    <input type='text' name="email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label>Gender:</label>
                    <input type='text' name="gender" value={this.state.gender} onChange={this.handleChange} />
                </div>
                <div className="field">
                    <label>Image Source:</label>
                    <input type='text' name="image_url" value={this.state.image_url} onChange={this.handleChange} />
                </div>
                <button type="submit" className="ui button">Edit My Profile</button>
            </form>
            <button className="ui button" onClick={this.deleteUser}>Delete This Profile</button>
        </div>
        )
    }
}

const mapDispatchToProps = {
    editUser,
    deleteUser
}

export default connect(null, mapDispatchToProps)(EditUserForm)