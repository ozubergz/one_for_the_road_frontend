import React, { Component } from 'react';
import { StripeProvider, Elements}  from 'react-stripe-elements';
import Form from '../components/Form';
import { connect } from 'react-redux';
import Banner from './Banner';

class Checkout extends Component {

    calculateTotal() {
        let items = this.props.items;
        let total = 0
        if(items && items.length > 0) {
            total = items.reduce((accum, curr) => {
                return accum + curr.price
            }, 0);
        }
    
        return total.toFixed(2);
      }

    render() {
        return (
            <div className="checkout-page">
                <Banner />
                <div className="checkout-body">
                    
                    <StripeProvider apiKey="pk_test_VfFbfNGD19WUOZQYldfMwr0l00s8N3zW2x">
                        <Elements>
                            <Form amount={this.calculateTotal()} />
                        </Elements>
                    </StripeProvider>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    if(localStorage.cart) {
        // when localStorage cart exists assign props with localStorage cart
        return { items: JSON.parse(localStorage.cart) }
    } else  {
        //when localStorage cart does not exists assign props with state
        return { items: state.cart.items }
    }
  }

export default connect(mapStateToProps)(Checkout);