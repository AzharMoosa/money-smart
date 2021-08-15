import React from "react";
import Layout from "../components/layout/Layout";
import { FaSortAmountUp } from "react-icons/fa";
import SavingsProgressCard from "../components/savings/SavingsProgressCard";
import { Link } from "react-router-dom";
const SavingsScreen = () => {
  return (
    <Layout>
      <div className="savings-screen-container">
        <div className="savings-screen-title">
          <h1 className="title">Savings</h1>
        </div>
        <div className="savings-nav">
          <button className="btn-small-dark">New</button>
          <input type="text" placeholder="Search.."></input>
          <div className="filter-icon">
            <FaSortAmountUp />
            <h3>Filter</h3>
          </div>
        </div>
        <Link className="link" to={`/savings/${1}`}>
          <SavingsProgressCard title={"House"} amount={50000} percentage={60} />
        </Link>

        <Link className="link" to={`/savings/${2}`}>
          <SavingsProgressCard title={"Car"} amount={20000} percentage={60} />
        </Link>

        <Link className="link" to={`/savings/${3}`}>
          <SavingsProgressCard title={"Shoes"} amount={100} percentage={60} />
        </Link>

        <Link className="link" to={`/savings/${4}`}>
          <SavingsProgressCard title={"Phone"} amount={800} percentage={60} />
        </Link>

        <div className="pagination">
          <h3>Previous</h3>
          <div className="pages">
            <h4>1 | 2 | 3</h4>
            <h3>Next</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsScreen;
