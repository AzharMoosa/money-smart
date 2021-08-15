import React from "react";
import Layout from "../components/layout/Layout";

const SavingsInfoScreen = ({ match }) => {
  return (
    <Layout>
      <div className="savings-info-container">
        <div className="savings-info-title">
          <h1 className="title">House</h1>
          <h1 className="title">£ 50000</h1>
        </div>

        <div className="savings-info-nav">
          <h4>View Info</h4>
          <h4>Add Amount</h4>
          <h4>Edit Info</h4>
          <h4>Delete Info</h4>
        </div>

        <div className="savings-info-layout">
          <div className="savings-info-progress"></div>
          <div className="savings-info-payments">
            <h3>Monthly Payments</h3>
          </div>
          <div className="savings-info-history">
            <h3>History</h3>
          </div>
          <div className="savings-info-info">
            <h3>Info</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsInfoScreen;
