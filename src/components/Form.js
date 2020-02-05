import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import { connect } from 'react-redux';
import { removeAllCartItems } from '../actions';

// import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';

class Form extends Component {
    
    state = {
        user_id: null,
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zip: ''
    }

    componentDidMount() {
        
        //get token from localStorage
        const token = localStorage.token;
    
        //fetch user's profile by sending token to the backend
        //send the jwt token in the Authorization header
        fetch("http://localhost:3000/api/profile", {
          method: "GET",
          headers: {
            Authorization: token
          }
        })
        .then(res => res.json())
        .then(data => {
          if(!data.user) {
            //when there's no current user:  "Please log in message"
            console.log('error', data)
          } else {
            console.log(data)
            this.setState({
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                user_id: data.user.id
            })
          }
        });
    }

    clear() {
        //clear localStorage
        localStorage.removeItem("cart");
        //clear cart items from redux state
        this.props.removeAllCartItems();

        this.setState({
            address: '',
            city: '',
            state: '',
            zip: ''
        });
    }

    //handles token to send to backend
    tokenHandler(tokenId, amount) {
        fetch('http://localhost:3000/charge', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: tokenId, amount})
        })
        .then(res => {
            console.log(res.ok)
            
            // check if transaction failed or not
            if(res.ok) {
                //when charge was a success
                //persist users cart to the backend if payment was successful
                this.handleSaveCart();
                this.clear();
                
            }
        });
        this.handleSaveCart();
    }

    handleSaveCart() {
        
        if(this.state.user_id && localStorage.cat) {
            let items = JSON.parse(localStorage.cart);

            fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    items
                })
            })
            .then(res => res.json())
            .then(res => {
               console.log(res)
            });
        }
    }

    ///handles form submit event handler
    handleSubmit = (e) => {
        e.preventDefault();

        let amount = this.props.amount;
        
        //creates strip token
        let token = this.props.stripe.createToken({
            name: `${this.state.first_name} ${this.state.last_name}`,
            address_line1: this.state.address,
            address_city: this.state.city,
            address_state: this.state.state,
            address_zip: this.state.zip
        });

        token.then(res => {
            if(res.error) {
                // error wrong inputs
                console.log(res.error)
            } else {
                let token = res.token
                console.log(token)
                //method to handle fetch
                this.tokenHandler(token.id, amount)
            }
        });

    }

    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    Total: <input id="total" readOnly value={this.props.amount} required/><br/>
                    <input 
                        type="text" 
                        name="first_name" 
                        placeholder="First Name"
                        onChange={this.handleChange} 
                        value={this.state.first_name} 
                        required
                    /><br/>
                    <input 
                        type="text" 
                        name="last_name" 
                        placeholder="Last Name"
                        onChange={this.handleChange} 
                        value={this.state.last_name} 
                        required
                    /><br/>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email"
                        onChange={this.handleChange} 
                        value={this.state.email} 
                        required
                    /><br/>
                    <input 
                        type="text" 
                        name="address" 
                        placeholder="Address"
                        onChange={this.handleChange} 
                        value={this.state.address} 
                        required
                    /><br/>
                    <input 
                        type="text" 
                        name="city" 
                        placeholder="City"
                        onChange={this.handleChange}
                        value={this.state.city}
                    /><br />
                    <input 
                        type="text" 
                        name="state"
                        placeholder="State" 
                        onChange={this.handleChange}
                        value={this.state.state}
                    /><br />
                    <input 
                        type="text" 
                        name="zip" 
                        placeholder="Zip Code"
                        onChange={this.handleChange}
                        value={this.state.zip}
                    /><br />

                    <CardElement />
                    <button>Confirm order</button>
                </form>
            </div>
        );
    }
}

export default connect(null, {removeAllCartItems})(injectStripe(Form));