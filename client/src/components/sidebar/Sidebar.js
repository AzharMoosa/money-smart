import React from "react";
import Logo from "../Logo";
import { FaSignOutAlt } from "react-icons/fa";
import HomeIcon from "../../img/home_icon.png";
import SavingsIcon from "../../img/savings_icon.png";
import TransactionsIcon from "../../img/transactions_icon.png";
import ReceiptsIcon from "../../img/receipts_icon.png";
import SettingsIcon from "../../img/settings_icon.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/userActions";

const Sidebar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar">
      <Logo width={64} height={41} textSize={30} />

      <div className="sidebar-items">
        <Link to="/">
          <div className="sidebar-item">
            <div className="sidebar-img">
              <img src={HomeIcon} alt="home-icon" />
            </div>
            <span>Dashboard</span>
          </div>
        </Link>
        <Link to="/savings">
          <div className="sidebar-item">
            <div className="sidebar-img">
              <img src={SavingsIcon} alt="savings-icon" />
            </div>
            <span>Savings</span>
          </div>
        </Link>
        <Link to="/transactions">
          <div className="sidebar-item">
            <div className="sidebar-img">
              <img src={TransactionsIcon} alt="transactions-icon" />
            </div>
            <span>Transactions</span>
          </div>
        </Link>
        <Link to="/receipts">
          <div className="sidebar-item">
            <div className="sidebar-img sidebar-item-px">
              <img src={ReceiptsIcon} alt="receipts-icon" />
            </div>
            <span>Receipts</span>
          </div>
        </Link>
        <Link to="/settings">
          <div className="sidebar-item">
            <div className="sidebar-img">
              <img src={SettingsIcon} alt="settings-icon" />
            </div>
            <span>Settings</span>
          </div>
        </Link>
      </div>

      <div className="sign-out-btn" onClick={logoutHandler}>
        <h2>Sign Out</h2>
        <FaSignOutAlt />
      </div>
    </div>
  );
};

export default Sidebar;
