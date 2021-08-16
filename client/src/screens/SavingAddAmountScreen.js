import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import moment from "moment";
import { useDispatch } from "react-redux";
import { addAmountToSaving } from "../actions/savingActions";
import { useHistory } from "react-router";

const SavingAddAmountScreen = ({ match }) => {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const id = match.params.id;
    const formattedDate = moment(date).format("DD/MM/YYYY").toString();
    dispatch(addAmountToSaving(parseInt(amount), formattedDate, id));
    history.push(`/savings/${id}`);
    history.go();
  };

  return (
    <Layout>
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
