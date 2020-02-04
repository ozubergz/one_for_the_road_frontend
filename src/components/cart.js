import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideNavBar from './SideNavBar';
import uuid from 'uuid';
import { Link } from 'react-router-dom';
import { setTotalPrice } from '../actions';

class Cart extends Component {

    

    renderCartItems() {
        let items = this.props.items
        if(items.length === 0) {
            return <h1>Add items to your cart</h1>
        } else {
            return (
                <ul>
                    {items.map(item => <li key={uuid()}>{item.name} <span>{item.price}</span></li>)}
                </ul>
            )
        }
    }

    // calculate total of the cart
    calculateTotal() {
        let items = this.props.items;
        let total = 0
        if(items.length > 0) {
            total = items.reduce((accum, curr) => {
                return accum + curr.price
            }, 0);
        }
        return total.toFixed(2);
    }

    //call dispatch action to set total price
    setTotal = () => {
        let total = this.calculateTotal();
        this.props.setTotalPrice(total)
    }
    
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="cart-body">
                    {this.renderCartItems()}
                    <div>
                        Total: {this.calculateTotal()}
                    </div>
                    <Link 
                        onClick={this.setTotal} 
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

const mapStateToProps = state => {
    return {
        items: state.cart.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTotalPrice: (total) => dispatch(setTotalPrice(total))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);