import React from "react";

import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/images/profile_pic.jpg";

function Navbar(props) {
  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    props.history.push("/login");
  };

  return (
    <nav className="navbar sticky-top p-3 client-nav-bar">
      <Link to="/">
        <img src={Logo} className="logo" alt="Logo" />
      </Link>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span className="user-name">Role : Admin</span>
          <Link className="nav-link" to="#" onClick={handleLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default withRouter(Navbar);
