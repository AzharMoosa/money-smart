import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { getUserDetails, updateUser } from "../actions/userActions";

const AccountSettingsScreen = ({ history, match }) => {
  const userId = match.params.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    success: successUpdate,
    error: errorUpdate,
  } = userUpdate;

  const userDetails = useSelector((state) => state.userDetails);
  const {
    loading: loadingUserDetails,
    user,
    error: errorUserDetails,
  } = userDetails;

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      firstName,
      lastName,
      email,
    };

    if (password !== confirmPassword) {
      setErrorMessage("Passwords Do Not Match");
      return;
    }

    if (password && password === confirmPassword) {
      updatedUser.password = password;
    }

    dispatch(updateUser(updatedUser));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: USER_UPDATE_RESET,
      });
      history.push("/settings");
    } else if (!user || !user.firstName || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [dispatch, history, user, successUpdate, userId]);

  return (
    <Layout>
      {loadingUserDetails && <Loading />}
      {errorUserDetails && <Message error={errorUserDetails} />}
      {loadingUpdate && <Loading />}
      {errorUpdate && <Message error={errorUpdate} />}
      {errorMessage && <Message error={errorMessage} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Account Settings</h1>
        </div>

        <div className="transactions-dashboard">
          <form
            className="user-account-form add-transaction"
            onSubmit={submitHandler}
          >
            <div className="add-transaction-input">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button className="add-transaction-btn" type="submit">
              Update Account
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AccountSettingsScreen;
