/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import ProductList from './productList.jsx';
import ProductEdit from './productEdit.jsx';
import ProductImg from './productImg.jsx';

const NotFound = () => <h1>Page not found</h1>;

export default function Contents() {
  return (
    <Switch>
      <Redirect exact from="/" to="/products" />
      <Route path="/products" component={ProductList} />
      <Route path="/edit/:id" component={ProductEdit} />  
      <Route path="/img/:id" component={ProductImg} />    
      <Route component={NotFound} />
    </Switch>
  );
}