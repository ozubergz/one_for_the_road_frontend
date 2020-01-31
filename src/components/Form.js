import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
// import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';

class Form extends Component {
    
    state = {
        name: '',
        amount: 0
    }

    tokenHandler(tokenId, amount) {
        fetch('http://localhost:3000/charge', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({token: tokenId, amount})
        })
        .then(res => {
            // check if transaction failed
            console.log(res)
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let amount = this.props.amount;
        
        let token = this.props.stripe.createToken({name: this.state.name});
        token.then(res => {
            if(res.error) {
                // error wrong inputs
                console.log(res.error)
            } else {
                let token = res.token
                this.tokenHandler(token.id, amount)
            }
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        // console.log(this.props.amount)
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    onChange={this.handleChange} 
                    value={this.state.name} 
                />
                <input 
                    type="text" name="amount"
                    onChange={this.handleChange}
                    value={this.props.amount}
                />

                <CardElement />
                <button>Confirm order</button>
            </form>
        );
    }
}

export default injectStripe(Form);