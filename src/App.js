import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import MenuContainer from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData } from './actions';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';

class App extends Component {

  componentDidMount() {
    this.props.fetchAllData();
    
    //get token from localStorage
    const token = localStorage.token;

    //fetch user's profile by sending token to the backend
    //send the jwt token in the Authorization header
    fetch("http://localhost:3000/api/profile", {
      method: "GET",
      headers: {
        Authorization: token
      }
    })
    .then(res => res.json())
    .then(data => {
      if(!data.user) {
        //when there's no current user, send "Please log in message"
        console.log('error', data)
      } else {
        console.log(data)
      }
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

  //return Cart component
  Cart = () => {
    let total = this.calculateTotal();
    let items = this.props.items
    return (
      <Cart 
        items={items}
        total={total}
      />
    );
  }

  //return Checkout component
  Checkout = () => {
    let total = this.calculateTotal();
    return (
      <Checkout total={total} />
    );
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={MenuContainer}/>
          <Route path="/cart" render={this.Cart} />
          <Route path="/checkout" render={this.Checkout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
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

export default connect(mapStateToProps, { fetchAllData })(App);
