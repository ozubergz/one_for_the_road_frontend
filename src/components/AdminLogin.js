import React, { Component } from 'react';
import { accessAdmin } from '../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class AdminForm extends Component {

    state = {
        email: '',
        password: '',
        redirect: null,
        error: null
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:3000/admin', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(res => {
            if(res.user) {
                this.props.accessAdmin();
                this.setState({redirect: true});
            } else {
                this.setState({error: res.message})
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    redirectToDashboard() {
        if(this.state.redirect) {
            return <Redirect to="/dashboard" />
        }
    }
    
    render() {
        return (
            <div className="container admin-form">
                {this.redirectToDashboard()}
                <h1>Admin Login</h1>
                <div className="error-message">
                    {this.state.error ? <h6>{this.state.error}</h6> : null }
                </div>
                <form onSubmit={this.handleSubmit} >
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control" 
                            id="email"
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control" 
                            id="password"
                            onChange={this.handleChange}
                        />
                    </div>
                    <button>Login</button>
                </form>
            </div>
        );
    }
}


// const mapDispatchToProps = dispatch => {
//     return {
//         accessAdmin: () => dispatch(accessAdmin())
//     }
// }

export default connect(null, { accessAdmin })(AdminForm);