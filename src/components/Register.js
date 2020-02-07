import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setUser } from '../actions';
import { connect } from 'react-redux';

class Register extends Component {

    state = {
        email: '',
        password: '',
        telephone: '',
        first_name: '',
        last_name: '',
        redirect: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    //send user's info to the backend
    handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:3000/api/signup', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(data => {
            if(!data.user) {
                //check if there is an registration error
                //output => {message: "Username already exists"}
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
                    telephone: '',
                    first_name: '',
                    last_name: '',
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
            <div className="register-page">
                <div className="register-bg"></div>
                <div className="register-body">
                    {this.redirectToHome()}
                    <form onSubmit={(e) => this.handleSubmit(e)} className="register-form">
                        <h3 className="mb-4">Sign Up</h3>
                        <div className="form-group">
                        <div className="name-form-group">
                            <div className="form-group first-name">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" onChange={this.handleChange} className="form-control" name="first_name" id="firstName" placeholder="First Name"/>
                            </div>

                            <div className="form-group last-name">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" onChange={this.handleChange} className="form-control" name="last_name" id="lastName" placeholder="Last Name"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="telephone">Telephone Number</label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="telephone" id="telephone" placeholder="Telephone"/>
                        </div>
                        <label htmlFor="inputEmail">Email</label>
                            <input type="email" onChange={this.handleChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" name="password" id="inputPassword" placeholder="Password"/>
                        </div>
                        
                        <button type="submit" className="btn btn-success register-btn">Submit</button>
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default connect(null, {setUser})(Register);