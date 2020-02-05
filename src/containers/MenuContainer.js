import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Items from '../components/Items';
import MenuSideBar from '../components/MenuSideBar';
import { addItemToCart } from '../actions';

class MenuContainer extends Component {
    

    //render the main menu page
    renderMenu = (renderProps) => {
        let id = Number(renderProps.match.params.id);
        let foundCategory = this.props.categories.find(category => {
            return category.id === id
        });
        
        if(foundCategory) {
            return (
                <div className="menu-body container">
                    <h1>{foundCategory.name}</h1>
                    {this.renderMenuItems(foundCategory.items)}
                </div>
            )
        }
    }

    addItemsToCart = (item) => {
        // call dispatch to addItems
        this.props.addItem(item);
        
        if(!localStorage.cart) {
            let newCart = [];
            newCart[0] = item
            localStorage.cart = JSON.stringify(newCart);
        } else {
            let cartLS = JSON.parse(localStorage.cart);
            cartLS.push(item);
            localStorage.cart = JSON.stringify(cartLS)
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
    
    render() {
        return (
            <div>
                <MenuSideBar 
                    numOfItems={ localStorage.cart ? JSON.parse(localStorage.cart).length : this.props.items.length}      
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
        items: state.cart.items
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem:(item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);