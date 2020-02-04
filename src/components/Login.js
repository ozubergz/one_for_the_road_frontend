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

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if(!data.id) {
                //check if user's login was unauthenticated
                console.log('error', data)
            } else {
                
            }
        });
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <div className="login-body">
                    <h1>Login</h1>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" onChange={this.handleChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" name="password" id="inputPassword" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;