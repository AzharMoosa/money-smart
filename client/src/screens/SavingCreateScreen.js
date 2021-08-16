import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { createSaving } from "../actions/savingActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { SAVING_CREATE_RESET } from "../constants/savingConstants";
import moment from "moment";

const SavingCreateScreen = ({ history }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const savingCreate = useSelector((state) => state.savingCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    saving,
  } = savingCreate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createSaving(
        name,
        amount,
        description,
        moment(date).format("DD/MM/YYYY").toString()
      )
    );
  };

  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: SAVING_CREATE_RESET,
      });
      history.push(`/savings/${saving._id}`);
    }
  }, [history, successCreate, dispatch, saving]);

  return (
    <Layout>
      {loadingCreate && <Loading />}
      {errorCreate && <Message error={errorCreate} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Add Saving</h1>
        </div>

        <div className="transactions-dashboard">
          <form className="add-transaction" onSubmit={submitHandler}>
            <div className="add-transaction-input">
              <label htmlFor="name">Name</label>
              <input
                type="name"
                id="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="date">Deadline</label>
              <input
                type="date"
                id="date"
                value={date}
                required
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="amount">Total Required</label>
              <input
                type="number"
                id="amount"
                value={amount}
                required
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="add-transaction-input">
              <label htmlFor="description">Description</label>
              <textarea
                type="description"
                id="description"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <button className="add-transaction-btn" type="submit">
              Create Saving
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SavingCreateScreen;
