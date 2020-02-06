import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';


class CartBox extends Component {

    renderCartItems() {
        let items = this.props.items
        if(items.length === 0) {
            return <h5 className="text-center" style={{color: "gray"}}>Add items to your cart</h5>
        } else {
            return this.cartItems();
        }
    }

    cartItems() {
        return this.props.items.map(item => {
            return (
                <div className="cart-items" key={uuid()}>
                    <button className="btn btn-danger btn-sm remove-btn">
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
                        <span>YOUR CART</span>
                    </div>
                    <div className="cart-body">
                        {this.renderCartItems()}
                    </div>
                    <div className="cart-box-footer">
                        <div className="cart-total">
                            SUBTOTAL: {this.calculateTotal()}
                        </div>
                        <button className="btn btn-danger checkout-btn">
                            Checkout
                            <Link className="checkout-link" to="/checkout">
                            </Link>
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}

export default CartBox;