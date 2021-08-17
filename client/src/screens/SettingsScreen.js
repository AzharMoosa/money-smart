import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { FaChevronRight } from "react-icons/fa";
import DefaultUser from "../img/default_user.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../actions/transactionActions";
import { deleteReceipt } from "../actions/receiptActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { TRANSACTION_DELETE_RESET } from "../constants/transactionConstants";
import { RECEIPT_DELETE_RESET } from "../constants/receiptConstants";

const SettingsScreen = () => {
  const dispatch = useDispatch();

  const transactionDelete = useSelector((state) => state.transactionDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = transactionDelete;

  const deleteTransactionsHandler = () => {
    confirmAlert({
      title: `Delete Transactions`,
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteTransaction());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const receiptDelete = useSelector((state) => state.receiptDelete);
  const {
    loading: loadingReceiptDelete,
    error: errorReceiptDelete,
    success: successReceiptDelete,
  } = receiptDelete;

  const deleteReceiptsHandler = () => {
    confirmAlert({
      title: `Delete Receipts`,
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteReceipt());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  useEffect(() => {
    if (successDelete) {
      dispatch({
        type: TRANSACTION_DELETE_RESET,
      });
    } else if (successReceiptDelete) {
      dispatch({
        type: RECEIPT_DELETE_RESET,
      });
    }
  }, [successDelete, dispatch, successReceiptDelete]);

  return (
    <Layout>
      {loadingDelete && <Loading />}
      {errorDelete && <Message error={errorDelete} />}
      {loadingReceiptDelete && <Loading />}
      {errorReceiptDelete && <Message error={errorReceiptDelete} />}
      <div className="settings-screen-container">
        <div className="settings-screen-title">
          <h1 className="title">Settings</h1>
        </div>

        <div className="settings-dashboard">
          <div className="settings-items">
            <h3 className="settings-title">Account</h3>
            <div className="settings-button">
              <h3>User Information</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Account Settings</h3>
              <FaChevronRight />
            </div>
            <h3 className="settings-title">Manage</h3>
            <div className="settings-button">
              <h3>Delete All Savings</h3>
              <FaChevronRight />
            </div>
            <div
              onClick={deleteTransactionsHandler}
              className="settings-button"
            >
              <h3>Delete All Transactions</h3>
              <FaChevronRight />
            </div>
            <div onClick={deleteReceiptsHandler} className="settings-button">
              <h3>Delete All Receipts</h3>
              <FaChevronRight />
            </div>
            <div className="settings-button">
              <h3>Delete Account</h3>
              <FaChevronRight />
            </div>
          </div>

          <div className="settings-user">
            <h3>John Doe</h3>
            <img src={DefaultUser} alt="user-img" />
            <div className="user-info">
              <div className="age">
                <h3>Age</h3>
                <h4>25</h4>
              </div>
              <div className="salary">
                <h3>Salary</h3>
                <h4>25000</h4>
              </div>
              <div className="retirement-age">
                <h3>Retirement Age</h3>
                <h4>65</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsScreen;
