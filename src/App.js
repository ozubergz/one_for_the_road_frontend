import React, { Component } from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import MenuContainer from "./containers/MenuContainer";
import Home from "./components/Home";
import { connect } from "react-redux";
import { fetchAllData } from './actions';

// import {StripeProvider, Elements} from 'react-stripe-elements';
// import Form from './components/Form';

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

export default connect(null, { fetchAllData })(App);
