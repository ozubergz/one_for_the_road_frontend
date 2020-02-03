import React, { Component } from 'react';
import SideNavBar from './SideNavBar';

class Register extends Component {

    state = {
        email: '',
        password: '',
        telephone: '',
        firstName: '',
        lastName: ''
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
                <div className="register-body">
                    <h1>Register</h1>
                    <form>
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
                            <input type="text" onChange={this.handleChange} className="form-control" name="firstName" id="firstName" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" onChange={this.handleChange} className="form-control" name="lastName" id="lastName" placeholder="Last Name"/>
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