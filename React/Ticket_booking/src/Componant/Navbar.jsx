import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="nav-logo">
        SupportDesk
      </div>

      <div className="nav-menu">
        <Link to="/">Dashboard</Link>

        <Link to="/createTicket">Create Ticket</Link>

        <Link to="/ticketDetails">Ticket Details</Link>
      </div>

      <div className="nav-login">
        <Link to="/login" className="login-btn">
          Login
        </Link>
      </div>

    </nav>
  );
};

export default Navbar;
