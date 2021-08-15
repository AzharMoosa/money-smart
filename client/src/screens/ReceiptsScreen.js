import React from "react";
import Layout from "../components/layout/Layout";
import RecentTransactionItem from "../components/transactions/RecentTransactionItem";

const ReceiptsScreen = () => {
  return (
    <Layout>
      <div className="receipts-screen-container">
        <div className="receipts-screen-title">
          <h1 className="title">Receipts</h1>
        </div>

        <div className="receipts-dashboard">
          <div className="recent-transactions">
            <div className="recent-transactions-title">
              <h2>Receipt History</h2>
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

          <div className="receipt-upload">
            <h3>Add New Receipt</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptsScreen;
