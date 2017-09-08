import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
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
        <li className="nav-item"><Link to="/about" className="nav-link">About</Link></li>
      </Nav>
    </Navbar.Collapse>
  </Navbar>;

export default NavBar;
