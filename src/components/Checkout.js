import React, { Component } from 'react';
import { StripeProvider, Elements}  from 'react-stripe-elements';
import Form from '../components/Form';
import { connect } from 'react-redux';
import Banner from './Banner';
import SideNavBar from './SideNavBar';

class Checkout extends Component {

    calculateTotal() {
        let { items } = this.props;
        let total = 0;
        if(items.length > 0) {
            items.forEach(item => {
                total += item.price;
                
                const { selectOptions } = item;
                if(selectOptions) {
                    selectOptions.forEach(option => {
                        total += option.price;
                    });
                }
            });            
        }
        return total.toFixed(2);
      }

    render() {
        return (
            <div>
                <SideNavBar />
                <div className="checkout-page">
                    <Banner />
                    <div className="checkout-body">
                        <StripeProvider apiKey={`${process.env.REACT_APP_STRIPE_KEY}`}>
                            <Elements>
                                <Form amount={this.calculateTotal()} />
                            </Elements>
                        </StripeProvider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { items: state.cart }
  }

export default connect(mapStateToProps)(Checkout);