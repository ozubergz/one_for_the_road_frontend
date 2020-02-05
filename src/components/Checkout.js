import React, { Component } from 'react';
import { StripeProvider, Elements}  from 'react-stripe-elements';
import Form from '../components/Form';

class Checkout extends Component {
    render() {
        return (
            <div className="checkout-body">
                <StripeProvider apiKey="pk_test_VfFbfNGD19WUOZQYldfMwr0l00s8N3zW2x">
                    <Elements>
                        <Form amount={this.props.total} />
                    </Elements>
                </StripeProvider>
            </div>
        );
    }
}

export default Checkout;