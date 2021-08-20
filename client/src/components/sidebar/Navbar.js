import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoImage from "../../img/logo_img.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleBurgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="nav-logo">
          <img src={LogoImage} alt={"Logo"} />
          <h2>Money Smart</h2>
        </div>
      </Link>
      <div onClick={handleBurgerMenu} className="navbar-bars">
        <FaBars />
      </div>
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className="navbar-burger-menu "
      >
        <div onClick={handleBurgerMenu} className="nav-link-burger navbar-bars">
          <FaTimes />
        </div>
        <Link to="/">
          <div className="nav-link-burger">Dashboard</div>
        </Link>
        <Link to="/savings">
          <div className="nav-link-burger">Savings</div>
        </Link>
        <Link to="/transactions">
          <div className="nav-link-burger">Transactions</div>
        </Link>
        <Link to="/receipts">
          <div className="nav-link-burger">Receipts</div>
        </Link>
        <Link to="/settings">
          <div className="nav-link-burger">Settings</div>
        </Link>
      </div>

      <div className="nav-menu">
        <Link to="/">
          <div className="nav-link">Dashboard</div>
        </Link>
        <Link to="/savings">
          <div className="nav-link">Savings</div>
        </Link>
        <Link to="/transactions">
          <div className="nav-link">Transactions</div>
        </Link>
        <Link to="/receipts">
          <div className="nav-link">Receipts</div>
        </Link>
        <Link to="/settings">
          <div className="nav-link">Settings</div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
