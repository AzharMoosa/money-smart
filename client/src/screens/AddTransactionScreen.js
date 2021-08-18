import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { TRANSACTION_CREATE_RESET } from "../constants/transactionConstants";
import { createTransaction } from "../actions/transactionActions";
import moment from "moment";

const AddTransactionScreen = ({ history }) => {
  const [transactionName, setTransactionName] = useState("");
  const [transactionType, setTransactionType] = useState("Rent");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [information, setInformation] = useState("");
  const dispatch = useDispatch();

  const transactionCreate = useSelector((state) => state.transactionCreate);
  const {
    loading: loadingCreate,
    success: successCreate,
    error: errorCreate,
  } = transactionCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction(
        transactionName,
        transactionType,
        information,
        moment(date).format("DD/MM/YYYY").toString(),
        parseFloat(amount)
      )
    );
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: TRANSACTION_CREATE_RESET,
      });
      history.push("/transactions");
    }
  }, [dispatch, history, successCreate]);

  return (
    <Layout>
      {loadingCreate && <Loading />}
      {errorCreate && <Message error={errorCreate} />}
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
              <select
                value={transactionType}
                type="transactionType"
                id="transactionType"
                required
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="Rent">Rent</option>
                <option value="Food">Food</option>
                <option value="Going Out">Going Out</option>
                <option value="Clothes/Shoes">Clothes</option>
                <option value="Groceries">Groceries</option>
                <option value="Bills">Bills</option>
                <option value="Holiday">Holiday</option>
                <option value="Other">Other</option>
              </select>
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
