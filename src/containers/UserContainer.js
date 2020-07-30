import React, {Component} from 'react'
import UserNavBar from '../components/user/UserNavBar'


class UserContainer extends Component {
    render() {
        return (
            <div className="login-container">
                <div><h1 className="App-header">Flatnote</h1></div>
                <UserNavBar />
            </div>
        ) 

    }
}

export default UserContainer