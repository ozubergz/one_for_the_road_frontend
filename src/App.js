import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import MenuContainer from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData } from './actions';
import Checkout from './components/Checkout';
import Register from './components/Register';
import Login from './components/Login';
import Banner from './components/Banner'

class App extends Component {

  componentDidMount() {
    //fetch all data from backend
    this.props.fetchAllData();    
  }

  render() {
    return (
      <div className='App'>
        <Banner />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={MenuContainer}/>
          <Route path="/checkout" component={Checkout} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}


export default connect(null, { fetchAllData })(App);
