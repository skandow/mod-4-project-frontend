import React, { Component } from 'react'
import { connect } from 'react-redux'

class UserProfile extends Component {
    state = {
        showProfile: true
    }

    renderProfile = () => {
        console.log("running")
        this.setState({
            showUserForm: !this.state.showUserForm
        })
    }
     
    render() {
        const {username, email, age, gender, image_url } = this.props.user
        return (
            <div className="user-profile">
                <h1>{username}</h1>
                <img src={image_url} alt="profile-pic" />
                <h2>Email: {email}</h2>
                <p>Age: {age}</p>
                <p>Gender: {gender}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(UserProfile)