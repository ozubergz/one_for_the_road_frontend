import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import { connect } from 'react-redux';
import { removeAllCartItems } from '../actions';
import SuccessModel from './SuccessModel';
import { Redirect } from 'react-router-dom';
import { trackPromise } from 'react-promise-tracker';
import LoadingPayment from './LoadingPayment';
import { GoogleMap } from '@react-google-maps/api';
import Autocomplete from 'react-google-autocomplete';
import PhoneInput, { thatReturnsFalse } from "react-phone-input-auto-format";

//WebSocket requests on ws://localhost:3000/cable
// const URL = "ws://localhost:3000/cable";

//new WebSocket to connect to server side
// const ws = new WebSocket(URL); 

class Form extends Component {
    
    state = {
        user_id: null,
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
        display: false,
        redirect: false,
        payError: '',
        addressErr: '',
        disabled: false
    }

    componentDidMount() {
        this.getUserProfile();

        // ws.onopen = () => {
        //     //on connecting, do nothing but log it on console
        //     console.log('WebSocket Client Connected');
        // }

        // ws.onclose = () => {
        //     //when disconnected, log it
        //     console.log('WebSocket disconnect')
        // }
        
    }

    getUserProfile() {
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
            if(data.user) {
                const {first_name, last_name, email, id, phone} = data.user;
                this.setState({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    user_id: id,
                    phone: phone
                });
            }
        });
    }

    clear() {
        //clear localStorage
        localStorage.removeItem("cart");
        //clear cart items from redux store
        this.props.removeAllCartItems();
    }

    //handles token to send to backend
    tokenHandler(tokenId, amount) {
        trackPromise(
            fetch('http://localhost:3000/charge', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({token: tokenId, amount})
            })
            .then(res => {
                if(res.ok) {
                    //when charge was a success
                    //persist users cart to the backend if payment was successful
                    this.handleSaveOrder();
                    this.clear();
                    this.setState({display: true});
                } else {
                    this.setState({
                        payError: "Your payment has failed, please try again.",
                        disabled: false
                    });
                }
            })
        )
    }

    handleCreateToken() {
        let amount = this.props.amount;

        //creates strip token
        let token = this.props.stripe.createToken({
            name: `${this.state.first_name} ${this.state.last_name}`,
            address_line1: this.state.address
        });

        //token is a promise
        token.then(res => {
            if(res.error) {
                // console.log(res.error)
                return;
            } else {
                let token = res.token;
                //method to handle fetch
                this.tokenHandler(token.id, amount)
            }
        });
    }

    handleSaveOrder() {
        if(localStorage.cart) {
            const items = JSON.parse(localStorage.cart);
            fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer: `${this.state.first_name} ${this.state.last_name}`,
                    email: this.state.email,
                    phone: this.state.phone,
                    address: this.state.address,
                    amount: this.props.amount,
                    items
                })
            })
            .then(res => res.json())
            .then(res => {
                if (!res.error) this.handleNotification() 
            });
        }
    }

    handleNotification() {
        fetch('http://localhost:3000/notification')
    }

    ///handles form submit event handler
    handleSubmit = (e) => {
        e.preventDefault();

        this.setState({disabled: true});

        const origin = '40-25 150th St Flushing NY 11354';
        
        //autocomplete input value
        const address = this.addressInput.refs.input.value;

        const unitSystem = window.google.maps.UnitSystem.IMPERIAL;
        
        if(address) {
            // google map api distance matrix that handles distance from origin to destination
            this.googleMap().getDistanceMatrix({
                origins: [origin],
                destinations: [address],
                travelMode: 'DRIVING',
                unitSystem: unitSystem
            }, (res) => {
                // check if address status is "OK"
                const { status } = res.rows[0].elements[0];
                if(status === 'OK') {
                    //get distance
                    const { distance } = res.rows[0].elements[0];
                    const miles = distance.text.replace('mi', '');
                    if(Number(miles) > 3) {
                        //when distance is out of zone send alert 
                        this.setState({
                            addressErr: "I'm sorry, we don't deliver that far",
                            disabled: false
                        });
                    } else {
                        this.setState({addressErr: ""})
                        this.handleCreateToken();
                    }
                } else {
                    this.setState({
                        addressErr: "Please enter address",
                        disabled: false
                    });
                }
            });
        } else {
            this.setState({
                addressErr: "Please enter address",
                disabled: false
            });
        }
    }

    googleMap = (map) => {
        const distanceMatrix = new window.google.maps.DistanceMatrixService();
        return distanceMatrix;
    }

    renderSubmitBtn() {
        const amount = Math.round(this.props.amount);
        const bool = (amount === 0 || this.state.disabled);
        
        return <button className="btn btn-danger order-btn mt-2" disabled={bool}>Confirm order</button>
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

    hideModel = () => {
        this.setState({
            redirect: true,
            display: false
        });
    }

    redirectToOrder() {
        if(this.state.redirect) {
            return <Redirect to="/order" />
        }
    }

    render() {
        return (
            <div className="checkout-form">
                <GoogleMap onLoad={this.googleMap}/>
                <LoadingPayment />
                {this.redirectToOrder()}
                <SuccessModel hideModel={this.hideModel} display={this.state.display}/>
                <form onSubmit={this.handleSubmit} className="row">
                    <div className="form-inputs col-md-8">
                        <div className="contact-info">
                            <div className="contact-header">
                                <i className='fa fa-user-circle icon'></i> <span className="header">Payment</span>
                                <hr/>
                            </div>
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
                                    <PhoneInput
                                        id="phone"
                                        onChange={this.handlePhone}
                                        className="form-control"
                                        value={this.state.phone}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="address-info">
                            <div className="address-header">
                                <i className="fa fa-address-card icon"></i> <span className="header">Address Info</span>
                                <hr/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <br/>
                                <div className="error-message mt-2">
                                    <h6>{this.state.addressErr}</h6>
                                </div>
                                <Autocomplete
                                    ref={(ref) => this.addressInput = ref}
                                    id="address"
                                    className="form-control"
                                    style={{width: '100%'}}
                                    onPlaceSelected={(place) => {
                                        this.setState({address: place.formatted_address})                                        
                                    }}
                                    types={['address']}
                                    componentRestrictions={{country: "us"}}
                                />
                            </div>
                        </div>
                        <div className="payment-info">
                            <div className="payment-header">
                                <i className="fa fa-credit-card icon"></i> <span className="header">Payment</span>
                                <hr/>
                            </div>
                            <div className="error-message mt-4">
                                <h6>{this.state.payError}</h6>
                            </div>
                            <label>Card Detail</label>
                            <CardElement 
                                onChange={(e) => {
                                    const { complete } = e;
                                    if (complete) {
                                        this.setState({ 
                                            disabled: false
                                        });
                                    }
                                }}
                                className="card-elemnt form-control"
                            />
                        </div>
                        
                    </div>
                    
                    <div className="form-total col-md-4">
                        <div className="total-box">
                            <h5>Total <span style={{textAlign: 'right'}}>{this.props.amount}</span></h5>
                            {this.renderSubmitBtn()}
                        </div>
                    </div>
                    
                </form>
            </div>
        );
    }
}

export default connect(null, {removeAllCartItems})(injectStripe(Form));