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
            <div>
                <SideNavBar />
                <div className="cart-body">
                    {this.renderCartItems()}
                    <div>
                        Total: {this.calculateTotal()}
                    </div>
                    {/* <Link className="checkout-btn" to="/checkout">
                        Checkout
                    </Link> */}
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

export default connect(mapStateToProps)(Cart)