import React, {Component} from 'react'
import { NavLink } from 'react-router-dom';


class LoginContainer extends Component {
    render() {
        return (
            <div className="login-container">
                <NavLink to="/login" exact>Please Log In</NavLink>
                <p>or</p> 
                <NavLink to="/sign_up" exact>Sign Up To Create An Account</NavLink>
            </div>
        ) 

    }
}

export default LoginContainer