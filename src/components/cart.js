import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideNavBar from './SideNavBar';
import uuid from 'uuid';
import { Link } from 'react-router-dom';

class Cart extends Component {

    renderCartItems() {
        let items = this.props.items
        if(items.length === 0) {
            return <h1>Add items to your cart</h1>
        } else {
            return (
                <ul>
                    {items.map(item => <li key={uuid()}>{item.name} <span>{item.price.toFixed(2)}</span></li>)}
                </ul>
            )
        }
    }
    
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="cart-body">
                    {this.renderCartItems()}
                    <div>
                        Total: {this.props.total}
                    </div>
                    <Link 
                        className="checkout-btn" 
                        to="/checkout"
                    >
                        Checkout
                    </Link>
                </div>
            </div>
        );
    }
}

export default Cart