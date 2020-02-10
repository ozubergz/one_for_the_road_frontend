import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../actions';
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
                
                //set user's token and id into redux state
                this.props.setUser({
                    token: data.jwt,
                    id: data.user.id
                });

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
                <div className="login-bg"></div>
                <div className="login-body">
                    {this.redirectToHome()}      
                    <form onSubmit={(e) => this.handleSubmit(e)} className="login-form">
                        <h4 className="mb-5">Login</h4>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input 
                                type="email" 
                                onChange={this.handleChange} 
                                className="form-control" 
                                name="email" 
                                id="inputEmail" 
                                aria-describedby="emailHelp" 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input 
                                type="password" 
                                onChange={this.handleChange} 
                                className="form-control" 
                                name="password" 
                                id="inputPassword" 
                            />
                        </div>
                        <button type="submit" className="btn btn-success login-btn">Submit</button>
                    </form>
                </div>
            </div>
        );
    }
}


export default connect(null, {setUser})(Login);