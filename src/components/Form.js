import React, { Component } from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
// import {CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe } from 'react-stripe-elements';

class Form extends Component {
    
    state = {
        name: ''
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
            // check if transaction failed or not
            console.log(res)
        })
    }

    ///handles form submit event handler
    handleSubmit = (e) => {
        e.preventDefault();

        let amount = this.props.amount;
        
        //creates strip token
        let token = this.props.stripe.createToken({name: this.state.name});
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
        })
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    onChange={this.handleChange} 
                    value={this.state.name} 
                />
                <input readOnly value={this.props.amount} />
                <CardElement />
                <button>Confirm order</button>
            </form>
        );
    }
}

export default injectStripe(Form);