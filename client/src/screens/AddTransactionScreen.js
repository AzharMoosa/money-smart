import React, { useState } from "react";
import Layout from "../components/layout/Layout";

const AddTransactionScreen = () => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [information, setInformation] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <Layout>
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Add Transaction</h1>
        </div>

        <div className="transactions-dashboard">
          <form className="add-transaction" onSubmit={submitHandler}>
            <div className="add-transaction-input">
              <label htmlFor="transactionName">Transaction Name</label>
              <input
                type="transactionName"
                id="transactionName"
                value={transactionName}
                required
                onChange={(e) => setTransactionName(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="transactionType">Transaction Type</label>
              <input
                type="transactionType"
                id="transactionType"
                value={transactionType}
                required
                onChange={(e) => setTransactionType(e.target.value)}
              />
            </div>

            <div className="add-transaction-input">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="information">Information</label>
              <textarea
                type="information"
                id="information"
                value={information}
                required
                onChange={(e) => setInformation(e.target.value)}
              />
            </div>
            <button className="add-transaction-btn" type="submit">
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddTransactionScreen;
