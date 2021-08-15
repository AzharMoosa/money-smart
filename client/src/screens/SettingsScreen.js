import React from "react";
import Layout from "../components/layout/Layout";
import { FaChevronRight } from "react-icons/fa";
import DefaultUser from "../img/default_user.png";

const SettingsScreen = () => {
  return (
    <Layout>
      <div className="settings-screen-container">
        <div className="settings-screen-title">
          <h1 className="title">Settings</h1>
        </div>

        <div className="settings-dashboard">
          <div className="settings-items">
            <h3 className="settings-title">Account</h3>
            <div className="settings-button">
              <h3>User Information</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Account Settings</h3>
              <FaChevronRight />
            </div>
            <h3 className="settings-title">Manage</h3>
            <div className="settings-button">
              <h3>Delete All Savings</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Delete All Transactions</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Delete All Receipts</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Delete Account</h3>
              <FaChevronRight />
            </div>
          </div>

          <div className="settings-user">
            <h3>John Doe</h3>
            <img src={DefaultUser} alt="user-img" />
            <div className="user-info">
              <div className="age">
                <h3>Age</h3>
                <h4>25</h4>
              </div>
              <div className="salary">
                <h3>Salary</h3>
                <h4>25000</h4>
              </div>
              <div className="retirement-age">
                <h3>Retirement Age</h3>
                <h4>65</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;
