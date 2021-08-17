import React from "react";
import Layout from "../components/layout/Layout";
import Dropzone from "../components/dropzone/Dropzone";

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

            <div className="recent-transactions-list"></div>
          </div>

          <div className="receipt-upload">
            <h3>Add New Receipt</h3>
            <Dropzone />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptsScreen;
