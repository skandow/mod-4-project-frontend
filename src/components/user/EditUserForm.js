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
        let email = this.state.email === '' ? this.props.user.email : this.state.email 
        let gender = this.state.gender === '' ? this.props.user.gender : this.state.gender
        let image_url = this.state.image_url === '' ? this.props.user.image_url : this.state.image_url
        const payload = {
            email: email,
            gender: gender,
            image_url: image_url
        }
        this.setState({
            redirect: '/'
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
                <h1>Edit Your Profile</h1>
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
                <button className="ui button delete" onClick={this.deleteUser}>Delete This Profile</button>
            </form>
            
        </div>
        )
    }
}

const mapDispatchToProps = {
    editUser,
    deleteUser
}

export default connect(null, mapDispatchToProps)(EditUserForm)