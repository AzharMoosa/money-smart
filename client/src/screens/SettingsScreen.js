import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { FaChevronRight } from "react-icons/fa";
import DefaultUser from "../img/default_user.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteTransaction } from "../actions/transactionActions";
import { deleteReceipt } from "../actions/receiptActions";
import { deleteAllSaving } from "../actions/savingActions";
import { deleteUser, getUserDetails } from "../actions/userActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { TRANSACTION_DELETE_RESET } from "../constants/transactionConstants";
import { RECEIPT_DELETE_RESET } from "../constants/receiptConstants";
import { SAVING_DELETE_RESET } from "../constants/savingConstants";
import { Link } from "react-router-dom";

const SettingsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    user,
    error: errorUserDetails,
    loading: loadingUserDetails,
  } = userDetails;

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

  const savingDeleteAll = useSelector((state) => state.savingDeleteAll);
  const {
    loading: loadingSavingsDelete,
    error: errorSavingsDelete,
    success: successSavingsDelete,
  } = savingDeleteAll;

  const deleteSavingsHandler = () => {
    confirmAlert({
      title: `Delete Savings`,
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteAllSaving());
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteAccount = (id) => {
    confirmAlert({
      title: `Delete Account`,
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteUser(id));
            history.push("/login");
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
    } else if (successSavingsDelete) {
      dispatch({
        type: SAVING_DELETE_RESET,
      });
    }
    dispatch(getUserDetails(userInfo._id));
  }, [
    successDelete,
    dispatch,
    userInfo,
    successReceiptDelete,
    successSavingsDelete,
  ]);

  return (
    <Layout>
      {loadingUserDetails && <Loading />}
      {errorUserDetails && <Message error={errorUserDetails} />}
      {loadingDelete && <Loading />}
      {errorDelete && <Message error={errorDelete} />}
      {loadingReceiptDelete && <Loading />}
      {errorReceiptDelete && <Message error={errorReceiptDelete} />}
      {loadingSavingsDelete && <Loading />}
      {errorSavingsDelete && <Message error={errorSavingsDelete} />}
      {!loadingUserDetails && user != null && (
        <div className="settings-screen-container">
          <div className="settings-screen-title">
            <h1 className="title">Settings</h1>
          </div>

          <div className="settings-dashboard">
            <div className="settings-items">
              <h3 className="settings-title">Account</h3>
              <Link to={`/settings/user/${user._id}`}>
                <div className="settings-button">
                  <h3>User Information</h3>
                  <FaChevronRight />
                </div>
              </Link>
              <Link to={`/settings/account/${user._id}`}>
                <div className="settings-button">
                  <h3>Account Settings</h3>
                  <FaChevronRight />
                </div>
              </Link>
              <h3 className="settings-title">Manage</h3>
              <div onClick={deleteSavingsHandler} className="settings-button">
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
              <div
                onClick={(e) => deleteAccount(user._id)}
                className="settings-button"
              >
                <h3>Delete Account</h3>
                <FaChevronRight />
              </div>
            </div>

            <div className="settings-user">
              <h3>
                {user.firstName} {user.lastName}
              </h3>
              <img src={DefaultUser} alt="user-img" />
              <div className="user-info">
                <div className="age">
                  <h3>Age</h3>
                  <h4>{user.age ? user.age : "N/A"}</h4>
                </div>
                <div className="salary">
                  <h3>Salary</h3>
                  <h4>{user.salary ? user.salary : "N/A"}</h4>
                </div>
                <div className="retirement-age">
                  <h3>Retirement Age</h3>
                  <h4>{user.retirementAge ? user.retirementAge : "N/A"}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SettingsScreen;
