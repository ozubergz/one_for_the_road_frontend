import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from 'react-router';
import Menu from '../components/Menu';
import Form from '../components/Form';
import {StripeProvider, Elements} from 'react-stripe-elements';

class MenuContainer extends Component {

    state = {
        orders: [],
        total: 0
    }

    renderCategoryList() {
        return this.props.categories.map(category => {
            return (
                <div key={category.id}>
                    <Link to={`/order/menu/${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            )
        });
    }

    addToOrder = (item) => {
        let orders = [...this.state.orders, item]
        this.setState({ orders });
    }

    findCategory = (renderProps) => {
        let id = Number(renderProps.match.params.id);
        let foundCategory = this.props.categories.find(category => {
            return category.id === id
        });

        return this.renderMenu(foundCategory);
    }
    
    renderMenu(category) {
        if (category) {
            return category.items.map(item => {
                return <Menu key={item.id} addToOrder={this.addToOrder} item={item} />
            });
        }
    }

    renderCartList() {
        let orders = this.state.orders
        if(orders.length !== 0) {
            return orders.map(item => {
                return <li key={item.id}>{item.name}, {item.price}</li>
            });
        }
    }
    
    // calculate total of the cart
    calculateTotal() {
        let orders = this.state.orders;
        let total = 0
        if(orders.length > 0) {
            total = orders.reduce((accum, curr) => {
                return accum + curr.price
            }, 0);
        }
        return total
    }
    
    render() {
        return (
            <div>
                <div className="menu-sidebar">
                    <h1>Menu Sidebar</h1>
                    {this.renderCategoryList()}
                </div>
                <Route path="/order/menu/:id" render={this.findCategory}/>
                <div className="cart">
                    <ul>
                        {this.renderCartList()}
                    </ul>
                    <div>
                       {/* Total: {this.calculateTotal()} */}
                        
                        <StripeProvider apiKey="pk_test_VfFbfNGD19WUOZQYldfMwr0l00s8N3zW2x">
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
    return {
        categories: state.menu.menus
    }
}

export default connect(mapStateToProps)(MenuContainer);