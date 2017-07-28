import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = () =>
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Loc8r</Link>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav id="navbar-main">
      <NavItem eventKey={1}><Link to="/about/">About</Link></NavItem>
    </Nav>
  </Navbar>;

export default NavBar;
