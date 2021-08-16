import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addAmountToSaving } from "../actions/savingActions";
import { SAVING_ADD_AMOUNT_RESET } from "../constants/savingConstants";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";

const SavingAddAmountScreen = ({ match, history }) => {
  const savingId = match.params.id;
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();

  const savingAddAmount = useSelector((state) => state.savingAddAmount);
  const {
    loading: loadingAddAmount,
    error: errorAddAmount,
    success: successAddAmount,
  } = savingAddAmount;

  useEffect(() => {
    if (successAddAmount) {
      dispatch({ type: SAVING_ADD_AMOUNT_RESET });
      history.push(`/savings/${savingId}`);
    }
  }, [dispatch, successAddAmount, history, savingId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formattedDate = moment(date).format("DD/MM/YYYY").toString();
    dispatch(addAmountToSaving(parseInt(amount), formattedDate, savingId));
  };

  return (
    <Layout>
      {loadingAddAmount && <Loading />}
      {errorAddAmount && <Message error={errorAddAmount} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Add Amount</h1>
        </div>

        <div className="transactions-dashboard">
          <form className="add-amount" onSubmit={submitHandler}>
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

            <button className="add-transaction-btn" type="submit">
              Add Amount
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SavingAddAmountScreen;
