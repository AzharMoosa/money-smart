import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { RECEIPT_UPDATE_RESET } from "../constants/receiptConstants";
import { getReceipt, updateReceipt } from "../actions/receiptActions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const ReceiptInfoScreen = ({ match, history }) => {
  const receiptId = match.params.id;
  const [receiptName, setReceiptName] = useState("");
  const [receiptType, setReceiptType] = useState("Rent");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const receiptDetails = useSelector((state) => state.receiptDetails);
  const { receipt, loading, error } = receiptDetails;

  const receiptUpdate = useSelector((state) => state.receiptUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = receiptUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateReceipt({
        ...receipt,
        receiptName,
        receiptType,
        amount: parseFloat(amount),
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: RECEIPT_UPDATE_RESET,
      });
      dispatch(getReceipt(receiptId));
      history.push("/receipts");
    } else {
      if (!receipt || !receipt.name || receipt._id !== receiptId) {
        dispatch(getReceipt(receiptId));
      } else {
        setReceiptName(receipt.name);
        setReceiptType(receipt.type);
        setAmount(receipt.amount);
      }
    }
  }, [dispatch, history, successUpdate, receiptId, receipt]);

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Message error={error} />}
      {loadingUpdate && <Loading />}
      {errorUpdate && <Message error={errorUpdate} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Update Receipt</h1>
        </div>

        <div className="transactions-dashboard">
          <form className="receipt-info" onSubmit={submitHandler}>
            <div className="add-transaction-input">
              <label htmlFor="transactionName">Receipt Name</label>
              <input
                type="transactionName"
                id="transactionName"
                value={receiptName}
                required
                onChange={(e) => setReceiptName(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="transactionType">Receipt Type</label>
              <select
                value={receiptType}
                type="transactionType"
                id="transactionType"
                required
                onChange={(e) => setReceiptType(e.target.value)}
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
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button
              className="open-light-box"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              View Receipt
            </button>

            {isOpen && (
              <Lightbox
                mainSrc={receipt.image}
                onCloseRequest={() => setIsOpen(false)}
              />
            )}

            <button className="add-transaction-btn" type="submit">
              Update Receipt
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptInfoScreen;
