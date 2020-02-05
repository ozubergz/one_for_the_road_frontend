import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class SideNavBar extends Component {

    state = {
        redirect: null
    }

    clearLocalStorage = () => {
        //clear localStorage
        localStorage.clear();
        this.setState({redirect: true})
    }

    renderLoginAndRegisterLinks() {
        return (
            <div>
                <Link className="login-link" to="/login">Login</Link>
                    <br/>
                <Link className="register-link" to="/register">Sign Up</Link>
            </div>
        )
    }

    renderLogoutBtn() {
        return (
            <button 
                onClick={this.clearLocalStorage} 
                className="btn btn-primary"
            >
                Log Out
            </button>
        );
    }

    redirectToHome() {
        //when state redirect is true return to main page
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
    }
    
    render() {
        return (
            <div className="main-sidebar">
                {this.redirectToHome()}
                <Link className="links" to="/order" >Order Online</Link>
                
                <br/>

                {
                    localStorage.token ? this.renderLogoutBtn() : this.renderLoginAndRegisterLinks()
                }

            </div>
        );
    }
}

export default SideNavBar;