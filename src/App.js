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
    const token = localStorage.getItem('token');

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

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={MenuContainer}/>
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, { fetchAllData })(App);
