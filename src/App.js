import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import MenuContainer from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData, addLocalItems } from './actions';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';
import NoMatch from './components/NoMatch';

class App extends Component {
  

  componentDidMount() {

    //fetch all data from backend
    this.props.fetchAllData();

    if(localStorage.cart) {
      //if localStorage cart exists, put the cart items in redux state
      let cartLS = JSON.parse(localStorage.cart);
      this.props.addLocalItems(cartLS)
    } else {
      //else create new empty array in localStorage
      let newCart = [];
      localStorage.cart = JSON.stringify(newCart)
    }
  }

  initMap() {
    
  }

  render() {
    return (        
      <div className='App'>
         
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/order" component={MenuContainer}/>
            <Route path="/checkout" component={Checkout} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route component={NoMatch} />
          </Switch>
      </div>
    )
  }
}


export default connect(null, { fetchAllData, addLocalItems })(App);
