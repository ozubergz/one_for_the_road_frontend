import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { setUser } from '../actions';
import { connect } from 'react-redux';
import SideNavBar from './SideNavBar';
import PhoneInput from "react-phone-input-auto-format";

class Register extends Component {

    state = {
        email: '',
        password: '',
        phone: '',
        first_name: '',
        last_name: '',
        redirect: null,
        errors: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handlePhone = (number) => {
        this.setState({
           phone: number 
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
                //output => {message: "Email has already been taken"}
                // console.log(data)
                this.setState({errors: data})
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
                    phone: '',
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

    showErrors() {
        return this.state.errors.map((err, i) => {
            return <h6 key={i}>{err}</h6>
        });
    }
    
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="register-page">
                    <div className="register-bg"></div>
                    <div className="register-overlay"></div>
                    <div className="register-body">
                        {this.redirectToHome()}
                        <form onSubmit={(e) => this.handleSubmit(e)} className="register-form">
                            <h4 className="mb-4">Sign Up</h4>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstName">First Name</label>
                                    <input 
                                        type="text" 
                                        onChange={this.handleChange} 
                                        className="form-control" 
                                        name="first_name" 
                                        id="firstName" 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input 
                                        type="text" 
                                        onChange={this.handleChange} 
                                        className="form-control" 
                                        name="last_name" 
                                        id="lastName" 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="phone-num">Phone Number</label>
                                    <PhoneInput
                                        id="phone"
                                        onChange={this.handlePhone}
                                        className="form-control"
                                        required
                                    />
                                    {/* <input 
                                        type="text" 
                                        onChange={this.handleChange} 
                                        className="form-control" 
                                        name="phone" 
                                        id="phone-num" 
                                    /> */}
                                </div>
                                <div className="form-group col-md-6">
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
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="inputPassword">Password</label>
                                <div className="error-message">
                                    {this.state.errors ? this.showErrors() : null}
                                </div>
                                <input 
                                    type="password" 
                                    onChange={this.handleChange} 
                                    className="form-control" 
                                    name="password" 
                                    id="inputPassword" 
                                />
                            </div>
                            <button type="submit" className="btn btn-success register-btn">Submit</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {setUser})(Register);