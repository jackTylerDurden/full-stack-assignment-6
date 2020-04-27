/* eslint linebreak-style: ["error","windows"] */
import React from 'react';
import {Navbar, Nav, NavItem, Grid } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import Contents from './contents.jsx';

function NavBar() {
  return (
      <Navbar>
        <Navbar.Header>
            <Navbar.Brand>My Compnay Inventory</Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer exact to="/">
              <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer exact to="/products">
              <NavItem>Product</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar>   
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid>
        <Contents />
      </Grid>
    </div>
  );
}