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
        address1: '',
        city: '',
        state: '',
        zip: '',
        phone: ''
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
                user_id: data.user.id,
                phone: data.user.telephone
            });
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
            address1: '',
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
            console.log(res)
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
            address_line2: this.state.address1,
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
            <div className="checkout-form">
                <form onSubmit={this.handleSubmit}>
                    <div className="contact-info">
                        <h5>Contact Info</h5>
                        <hr/>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="firstName">First Name</label>
                                <input 
                                    id="firstName"
                                    type="text" 
                                    name="first_name" 
                                    onChange={this.handleChange} 
                                    value={this.state.first_name} 
                                    className="form-control"
                                    required
                                /><br/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="lastName">Last Name</label>
                                <input 
                                    id="lastName"
                                    type="text" 
                                    name="last_name" 
                                    onChange={this.handleChange} 
                                    value={this.state.last_name} 
                                    className="form-control"
                                    required
                                /><br/>
                            </div>
                        </div>
                        <div className="form-row email-phone-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="email">Email</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    name="email" 
                                    onChange={this.handleChange} 
                                    value={this.state.email} 
                                    className="form-control"
                                    required
                                /><br/>
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="phone-num">Phone Number</label>
                                <input 
                                    id="phone-num"
                                    type="text" 
                                    name="phone"
                                    onChange={this.handleChange} 
                                    value={this.state.phone} 
                                    className="form-control"
                                    required
                                /><br/>
                            </div>
                        </div>
                    </div>

                    <div className="address-info">
                        <h5>Address Info</h5>
                        <hr/>
                        <div className="form-row">
                            <div className="col-md-6">
                                <label htmlFor="address">Address</label>
                                <input 
                                    id="address"
                                    type="text" 
                                    name="address" 
                                    placeholder="1234 Main st."
                                    onChange={this.handleChange} 
                                    value={this.state.address} 
                                    className="form-control"
                                    required
                                /><br/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="address1">Address 2</label>
                                <input 
                                    id="address1"
                                    type="text" 
                                    name="address1" 
                                    placeholder="Apartment, studio, or floor "
                                    onChange={this.handleChange} 
                                    value={this.state.address1} 
                                    className="form-control"
                                /><br/>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="city">City</label>
                                <input
                                    id="city" 
                                    type="text" 
                                    name="city" 
                                    onChange={this.handleChange}
                                    value={this.state.city}
                                    className="form-control"
                                    required
                                /><br />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="state">State</label>
                                <input
                                    id="state" 
                                    type="text" 
                                    name="state"
                                    placeholder="State" 
                                    onChange={this.handleChange}
                                    value={this.state.state}
                                    className="form-control"
                                    required
                                /><br />
                            </div>
                            <div className="form-group col-md-2">
                                <label htmlFor="zip">ZIP Code</label>
                                <input 
                                    id="zip"
                                    type="text" 
                                    name="zip" 
                                    onChange={this.handleChange}
                                    value={this.state.zip}
                                    className="form-control"
                                    required
                                /><br />
                            </div>
                        </div>
                    </div>

                    <div className="payment-info">
                        <h5>Payment</h5>
                        <hr/>
                        <label>Card Detail</label>
                        <CardElement className="form-control"  />
                    </div>
                    
                    <div className="total mt-4">
                        <h5>Total </h5>
                        <input readOnly value={`$${this.props.amount}`} required/><br/>
                    </div>
                    
                    <button className="btn btn-primary order-btn mt-2">Confirm order</button>
                </form>
            </div>
        );
    }
}

export default connect(null, {removeAllCartItems})(injectStripe(Form));