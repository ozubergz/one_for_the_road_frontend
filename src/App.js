// import React, { useEffect, useState } from 'react';
import React from 'react';
import './styles/App.css';
import { Route, Switch } from "react-router";
import Menu from "./components/Menu";
import Home from "./components/Home";
// import {StripeProvider, Elements} from 'react-stripe-elements';
// import Form from './components/Form';

// import Categories from './containers/Categories'

function App() {

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
  );
}

export default App;
