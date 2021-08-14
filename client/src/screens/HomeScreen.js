import React from "react";
import Layout from "../components/layout/Layout";

const HomeScreen = () => {
  return (
    <Layout>
      <div className="home-container">
        <div className="home-title">
          <h1 className="title">Dashboard</h1>
          <div className="user-icon">
            <h3>John Doe</h3>
            <div className="user-img"></div>
          </div>
        </div>

        <div className="home-data-overview">
          <div className="home-left">
            <div className="monthly-spending-overview">
              <h3>Monthly Spending</h3>
            </div>
            <div className="savings-overview">
              <h3>Savings</h3>
              <div className="savings-cards">
                <div className="savings-card">
                  <h3>House</h3>
                </div>
                <div className="savings-card">
                  <h3>Car</h3>
                </div>
                <div className="savings-card">
                  <h3>Shoes</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="highest-expense-overview">
            <h3>Highest Expenses</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
