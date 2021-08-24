import React, { Component } from "react";
import { Link } from "react-router-dom";

import Logo from "../../../assets/images/profile_pic.jpg";

import { auth_token } from "../../../auth/auth";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar sticky-top client-nav-bar">
          <span className="text-white">
            <img src={Logo} className="logo" alt="Logo" /> &nbsp; Time Log
          </span>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              {auth_token() ? (
                <Link to="/login" className="nav-link nav-link-mobile">
                  Hi Chamara
                </Link>
              ) : (
                <>
                  <Link to="/login" className="nav-link nav-link-mobile">
                    Login
                  </Link>
                  <span className="nav-link">
                    <i className="fas fa-bars"></i>
                  </span>
                </>
              )}
            </li>
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
