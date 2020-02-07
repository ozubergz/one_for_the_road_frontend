import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Items from '../components/Items';
import MenuSideBar from '../components/MenuSideBar';
import { addItemToCart } from '../actions';
import CartBox from '../components/CartBox';
import Banner from '../components/Banner'


class MenuContainer extends Component {

    //render the main menu page of food items
    renderMenu = (renderProps) => {
        let id = Number(renderProps.match.params.id);
        let foundCategory = this.props.categories.find(category => {
            return category.id === id
        });
        
        if(foundCategory) {
            return (
                <div className="menu-page">
                    <div className="menu-body">
                        <div className="menu-header">
                            <h3>{foundCategory.name.toUpperCase()}</h3>
                        </div>
                        {this.renderMenuItems(foundCategory.items)}
                    </div>
                    <CartBox items={this.props.items} />
                </div>
            )
        }
    }

    //render all menu items
    renderMenuItems = (items) => {
        return items.map(item => {
            return ( 
                <Items 
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
                <MenuSideBar 
                    categories={this.props.categories} 
                />
                <Route path="/order/menu/:id" render={this.renderMenu}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.menu,
        items: localStorage.cart ? JSON.parse(localStorage.cart) : state.cart.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem:(item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);