import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';


class LoginContainer extends Component {
    render() {
        return (
            <div className="login-container ui menu">
                <NavLink className="App-link ui item" to="/login" exact>Log In</NavLink> 
                <NavLink className="App-link ui item" to="/sign_up" exact>Sign Up To Create An Account</NavLink>
            </div>
        ) 

    }
}

export default LoginContainer