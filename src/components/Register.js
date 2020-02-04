import React, { Component } from 'react';
import SideNavBar from './SideNavBar';

class Register extends Component {

    state = {
        email: '',
        password: '',
        telephone: '',
        first_name: '',
        last_name: ''
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
                localStorage.token = data.jwt
                localStorage.id = data.user.id

                console.log('registration success');

                //redirect to main page
            }
        });
    }
    
    
    
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="register-body">
                    <h1>Register</h1>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" onChange={this.handleChange} className="form-control" name="email" id="inputEmail" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" onChange={this.handleChange} className="form-control" name="password" id="inputPassword" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="first_name" id="firstName" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="last_name" id="lastName" placeholder="Last Name"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="telephone">Telephone Number</label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="telephone" id="telephone" placeholder="telephone"/>
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    
                </div>
            </div>
        );
    }
}

export default Register;