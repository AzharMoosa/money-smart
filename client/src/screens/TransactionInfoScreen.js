import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { TRANSACTION_UPDATE_RESET } from "../constants/transactionConstants";
import {
  getTransaction,
  updateTransaction,
} from "../actions/transactionActions";
import moment from "moment";

const TransactionInfoScreen = ({ match, history }) => {
  const transactionId = match.params.id;
  const [transactionName, setTransactionName] = useState("");
  const [transactionType, setTransactionType] = useState("Rent");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [information, setInformation] = useState("");
  const dispatch = useDispatch();

  const transactionDetails = useSelector((state) => state.transactionDetails);
  const { transaction, loading, error } = transactionDetails;

  const transactionUpdate = useSelector((state) => state.transactionUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = transactionUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTransaction({
        ...transaction,
        transactionName,
        transactionType,
        information,
        date: moment(date).format("DD/MM/YYYY").toString(),
        amount: parseInt(amount),
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: TRANSACTION_UPDATE_RESET,
      });
      dispatch(getTransaction(transactionId));
      history.push("/transactions");
    } else {
      if (
        !transaction ||
        !transaction.name ||
        transaction._id !== transactionId
      ) {
        dispatch(getTransaction(transactionId));
      } else {
        setTransactionName(transaction.name);
        setTransactionType(transaction.type);
        const date = transaction.date.split("/");
        setDate(`${date[2]}-${date[1]}-${date[0]}`);
        setAmount(transaction.amount);
        setInformation(transaction.information);
      }
    }
  }, [dispatch, history, successUpdate, transactionId, transaction]);

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Message error={error} />}
      {loadingUpdate && <Loading />}
      {errorUpdate && <Message error={errorUpdate} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Update Transaction</h1>
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
                <option selected="selected" value="Rent">
                  Rent
                </option>
                <option value="Food">Food</option>
                <option value="Going Out">Going Out</option>
                <option value="Clothes/Shoes">Clothes</option>
                <option value="Groceries">Groceries</option>
                <option value="Bills">Bills</option>
                <option value="Holiday">Holiday</option>
                <option value="Other">Other</option>
              </select>
              {/* <input
                type="transactionType"
                id="transactionType"
                value={transactionType}
                required
                onChange={(e) => setTransactionType(e.target.value)}
              /> */}
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
              Update Transaction
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionInfoScreen;
