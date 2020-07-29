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
            <div className="user-profile ui card">
                <div className="image">
                <img src={image_url} alt="profile-pic" />
                </div>
                <div className="content">
                    <div className="header">
                    {username}
                    </div>
                    <div className="description">
                    <h4>Email: {email}</h4>
                        <p>Age: {age}</p>
                        <p>Gender: {gender}</p>
                    </div>
                </div>                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(UserProfile)