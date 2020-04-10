import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import "./Navbar.css";

class NavbarPage extends Component {
  state = {
    isOpen: false,
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <MDBNavbar color="white" light expand="md">
        <MDBNavbarBrand>
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-top"
            alt="logo"
          />
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <NavLink
                to="/"
                exact
                className="nav-link"
                activeClassName="navbar-navlink-style"
              >
                Home
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink
                to="/add"
                exact
                className="nav-link"
                activeClassName="navbar-navlink-style"
              >
                Add
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink
                to="/edit"
                exact
                className="nav-link"
                activeClassName="navbar-navlink-style"
              >
                Edit
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink
                to="/stats"
                exact
                className="nav-link"
                activeClassName="navbar-navlink-style"
              >
                Stats
              </NavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right></MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;
