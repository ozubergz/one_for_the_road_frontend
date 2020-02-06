import React, { Component } from 'react';
import SideNavBar from './SideNavBar';
import { Redirect } from 'react-router-dom';

class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    //subt user's email and password
    handleSubmit = (e) => {
        e.preventDefault();
        //fetch user's authentication
        fetch('http://localhost:3000/api/login', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            
            if(!data.user) {
                //check if user's login is unauthenticated
                //output => {message: "Invalid Username or Password"}
                console.log('error', data)
            } else {
                //set token and user id to localStorage
                localStorage.token = data.jwt;
                localStorage.id = data.user.id;

                this.setState({
                    email: '',
                    password: '',
                    redirect: true
                });                
            }
        });
    }

    redirectToHome() {
        //when state redirect is true return to main page
        if(this.state.redirect) {
            return <Redirect to="/" />
        } 
    }

    render() {
        return (
            <div className="login-page">
                <SideNavBar />
                <div className="login-bg"></div>
                <div className="login-body">
                    <h3 className="text-center mb-5">Log In</h3>
                    {this.redirectToHome()}      
                    <form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" onChange={this.handleChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" name="password" id="inputPassword" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-success login-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;