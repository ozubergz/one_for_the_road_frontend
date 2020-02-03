import React, { Component } from 'react';
import SideNavBar from './SideNavBar';

class Login extends Component {

    state = {
        email: '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <div className="login-body">
                    <h1>Login</h1>
                    <form>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" onChange={this.handleChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" name="password" id="inputPassword" placeholder="Password"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;