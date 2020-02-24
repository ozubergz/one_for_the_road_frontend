import React, { Component } from 'react';

class AdminForm extends Component {

    state = {
        email: '',
        password: ''
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
        .then(console.log)
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() {
        return (
            <div className="container admin-form">
                <h1>Admin Login</h1>
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

export default AdminForm;