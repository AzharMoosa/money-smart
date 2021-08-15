import React from "react";
import Layout from "../components/layout/Layout";
import HighestExpenses from "../components/transactions/HighestExpenses";
import RecentTransactionItem from "../components/transactions/RecentTransactionItem";

const TransactionsScreen = () => {
  return (
    <Layout>
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Transactions</h1>
        </div>

        <div className="transactions-dashboard">
          <div className="recent-transactions">
            <div className="recent-transactions-title">
              <h2>Recent Transactions</h2>
              <button className="btn-medium-dark">Add</button>
            </div>

            <div className="recent-transactions-list">
              <RecentTransactionItem
                date={new Date()}
                name={"Mc Donalds"}
                type={"Food"}
                price={10.2}
              />
              <RecentTransactionItem
                date={new Date()}
                name={"Starbucks"}
                type={"Food"}
                price={5.7}
              />
              <RecentTransactionItem
                date={new Date()}
                name={"Rent"}
                type={"Home"}
                price={1800}
              />
              <RecentTransactionItem
                date={new Date(2021, 7, 14, 12)}
                name={"Rent"}
                type={"Home"}
                price={1800}
              />
            </div>
          </div>
          <HighestExpenses height={905} />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsScreen;
