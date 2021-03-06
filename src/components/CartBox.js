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
                        <div className="cart-items-options">
                            {
                                item.select_options ?
                                    item.select_options.map(option => {
                                        return <div key={option.id} > - {option.name} {option.price ? `+${option.price.toFixed(2)}` : null} </div>
                                    }) : null
                            }
                        </div>
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
        return total === 0 ?
            (
                <button className="btn btn-secondary disabled-checkout-btn" disabled>
                    Checkout
                </button>
            ) 
                :
            (
                <button className="btn btn-danger checkout-btn">
                    Checkout
                    <Link className="checkout-link" to="/checkout">
                    </Link>
                </button>   
            )
    }

    calculateTotal() {
        let { items } = this.props;
        let total = 0;

        if(items.length > 0) {
            items.forEach(item => {
                total += item.price;
                
                const { select_options } = item;
                if(select_options) {
                    select_options.forEach(option => {
                        total += option.price;
                    });
                }
            });            
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