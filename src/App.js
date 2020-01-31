// import React, { useEffect, useState } from 'react';
import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import Menu from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData } from './actions';

// import {StripeProvider, Elements} from 'react-stripe-elements';
// import Form from './components/Form';
// import Categories from './containers/Categories'

class App extends Component {

  componentDidMount() {
   this.props.fetchAllData()
  }

  render() {
    console.log(this.props.menus)
    return (
      <div className='App'>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/order" component={Menu}/>
        </Switch>
  
        {/* <StripeProvider apiKey="pk_test_VfFbfNGD19WUOZQYldfMwr0l00s8N3zW2x">
          <Elements>
             <Form/>
          </Elements>
        </StripeProvider> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    menus: state.menu.menus
  }
}

export default connect(mapStateToProps, { fetchAllData })(App);
