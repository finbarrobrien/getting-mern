import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = () =>
  <Navbar fixedTop >
    <Navbar.Header>
      <Navbar.Brand>
        <Link to="/">Loc8r</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav id="navbar-main">
        <NavItem eventKey={1} href="/about/">About</NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default NavBar;
