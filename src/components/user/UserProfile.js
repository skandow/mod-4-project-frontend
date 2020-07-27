import React, { Component } from 'react'
import EditUserForm from './EditUserForm'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class UserProfile extends Component {
    state = {
        showUserForm: false
    }

    renderForm = () => {
        this.setState({
            showUserForm: !this.state.showUserForm
        })
    }
     
    render() {
        const {id, username, email, age, gender, image_url } = this.props.user
        return (
            <div className="user-profile">
                <h1>{username}</h1>
                <img src={image_url} alt="profile-pic" />
                <h2>Email: {email}</h2>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
                <p>Id: {id}</p>
                <button onClick={this.renderForm}>Edit Your Profile</button>
                {this.state.showUserForm ?
                <EditUserForm user={this.props.user} renderForm={this.renderForm}/>
                :
                null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.users[0] }
}

export default connect(mapStateToProps)(UserProfile)