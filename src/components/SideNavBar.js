import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class SideNavBar extends Component {
    render() {
        return (
            <div className="main-sidebar">

                <h1>NavBar</h1>
                {/* Link to Menu page */}
                <Link className="links" to="/order" >Order Online</Link>
                
                <br/>

                {/* Link to Login */}
                <Link className="login-link" to="/login">Login</Link>

                <br/>

                {/* Link to Register */}
                <Link className="register-link" to="/register">Sign Up</Link>

            </div>
        );
    }
}

export default SideNavBar;