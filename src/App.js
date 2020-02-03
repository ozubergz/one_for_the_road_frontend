import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import MenuContainer from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData } from './actions';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

class App extends Component {

  componentDidMount() {
    this.props.fetchAllData()
  }

  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={MenuContainer}/>
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </div>
    )
  }
}

export default connect(null, { fetchAllData })(App);
