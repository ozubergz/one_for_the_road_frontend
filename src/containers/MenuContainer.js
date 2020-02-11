import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router';
import MenuItems from '../components/MenuItems';
import { addItemToCart } from '../actions';
import CartBox from '../components/CartBox';
import Banner from '../components/Banner'


class MenuContainer extends Component {
    

    //render the main menu page of food items
    renderMenu() {
        let categories = this.props.menus;
        return categories.map(category => {
            return (
                <div className="menu-page" key={category.id}>
                    <div className="menu-body">
                        <div className="menu-header">
                            <h4>{category.name.toUpperCase()}</h4>
                        </div>
                        {this.renderMenuItems(category.items)}
                    </div>
                </div>
            )
        });
    }

    //render all menu items
    renderMenuItems = (items) => {
        return items.map(item => {
            return ( 
                <MenuItems 
                    key={item.id} 
                    addItemsToCart={this.addItemsToCart}
                    item={item}
                />
            )
        });
    }

    //add item to redux state and localStorage
    addItemsToCart = (item) => {
        // call dispatch to addItems
        this.props.addItem(item);
        
        if(!localStorage.cart) {
            //create new cart array when cart does not exists from localStorage
            let newCart = [];
            newCart[0] = item;
            localStorage.cart = JSON.stringify(newCart);
        } else {
            //else get cart from localStorage and push items into cart array
            let cartLS = JSON.parse(localStorage.cart);
            cartLS.push(item);
            localStorage.cart = JSON.stringify(cartLS)
        }
    }
    
    render() {
        return (
            <div>
                <Banner/>
                {this.renderMenu()}
                <CartBox items={this.props.cartItems} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        menus: state.menu,
        cartItems: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem:(item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);