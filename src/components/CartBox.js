import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';


class CartBox extends Component {

    renderCartItems() {
        let items = this.props.items
        if(items.length === 0) {
            return <h6 className="text-center" style={{color: "gray"}}>Add items to your cart</h6>
        } else {
            return this.cartItems();
        }
    }

    cartItems() {
        return this.props.items.map((item, index) => {
            return (
                <div className="cart-items" key={uuid()}>
                    <button 
                        onClick={() => this.props.removeCartItems(index)} 
                        className="btn btn-danger btn-sm remove-btn">
                        <i className="fa fa-minus"></i>
                    </button>
                    <div className="cart-items-name">
                        {item.name} 
                    </div>
                    <div className="cart-items-price">
                        {item.price.toFixed(2)}
                    </div>
                </div>
            )
        });
    }

    renderCheckoutBtn() {
        let total = Math.round(this.calculateTotal());
        if(total === 0) {
            return (
                <button className="btn btn-secondary disabled-checkout-btn" disabled>
                    Checkout
                </button>
            )
        } else {
            return (
                <button className="btn btn-danger checkout-btn">
                    Checkout
                    <Link className="checkout-link" to="/checkout">
                    </Link>
                </button>   
            )
        }
    }

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

    render() {
        return (
            <div className="menu-cart">
                <div className="cart-box">
                    <div className="cart-header">
                        <i className="fa fa-shopping-cart"></i><span>Cart</span>
                    </div>
                    <div className="cart-body">
                        {this.renderCartItems()}
                    </div>
                    <div className="cart-box-footer">
                        <div className="cart-total">
                            Subtotal: {this.calculateTotal()}
                        </div>
                        {this.renderCheckoutBtn()}    
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default CartBox;