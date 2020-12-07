import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';


class LoginContainer extends Component {
    render() {
        return (
            <div className="login-container App-body">
                <NavLink className="App-link ui button" to="/login" exact>Log In</NavLink> 
                <br></br>
                <br></br>
                <NavLink className="App-link ui button" to="/sign_up" exact>Sign Up To Create An Account</NavLink>
            </div>
        ) 
    };
};

export default LoginContainer