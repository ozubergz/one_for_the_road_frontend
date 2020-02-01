import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Menu from '../components/Menu';
import MenuSideBar from '../components/MenuSideBar';
import { addItemToCart } from '../actions';

// import { StripeProvider, Elements}  from 'react-stripe-elements';
// import Form from '../components/Form';

class MenuContainer extends Component {

    renderMenuItems = (renderProps) => {
        let id = Number(renderProps.match.params.id);
        let foundCategory = this.props.categories.find(category => {
            return category.id === id
        });

        if (foundCategory) {
            return foundCategory.items.map(item => {
                return <Menu key={item.id} addItem={this.props.addItem} item={item} />
            });
        }
    }

    // renderCartList() {
    //     let orders = this.state.orders
    //     if(orders.length !== 0) {
    //         return orders.map(item => {
    //             return <li key={item.id}>{item.name}, {item.price}</li>
    //         });
    //     }
    // }
    
    // calculate total of the cart
    // calculateTotal() {
    //     let orders = this.state.orders;
    //     let total = 0
    //     if(orders.length > 0) {
    //         total = orders.reduce((accum, curr) => {
    //             return accum + curr.price
    //         }, 0);
    //     }
    //     return total
    // }
    
    render() {
        return (
            <div>
                <MenuSideBar categories={this.props.categories} />
                <Route path="/order/menu/:id" render={this.renderMenuItems}/>
                {/* <div className="cart">
                    <ul>
                        {this.renderCartList()}
                    </ul>
                    <div>
                        <StripeProvider apiKey="pk_test_VfFbfNGD19WUOZQYldfMwr0l00s8N3zW2x">
                            <Elements>
                                <Form amount={this.calculateTotal()} />
                            </Elements>
                        </StripeProvider>
                    </div>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.menu
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem:(item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);