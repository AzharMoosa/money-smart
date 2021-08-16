import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaving } from "../actions/savingActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import { updateSaving } from "../actions/savingActions";
import { SAVING_UPDATE_RESET } from "../constants/savingConstants";
import moment from "moment";

const SavingEditInfoScreen = ({ match, history }) => {
  const savingId = match.params.id;
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const savingDetails = useSelector((state) => state.savingDetails);
  const { saving, loading, error } = savingDetails;

  const savingUpdate = useSelector((state) => state.savingUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = savingUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateSaving({
        ...saving,
        name,
        deadline: moment(date).format("DD/MM/YYYY").toString(),
        amountRequired: amount,
        description,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({
        type: SAVING_UPDATE_RESET,
      });
      history.push(`/savings/${savingId}`);
    } else {
      if (!saving || !saving.name || saving._id !== savingId) {
        dispatch(getSaving(savingId));
      } else {
        setName(saving.name);
        const deadline = saving.deadline.split("/");
        setDate(`${deadline[2]}-${deadline[1]}-${deadline[0]}`);
        setAmount(saving.amountRequired);
        setDescription(saving.description);
      }
    }
  }, [history, successUpdate, dispatch, savingId, saving]);

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Message error={error} />}
      {loadingUpdate && <Loading />}
      {errorUpdate && <Message error={errorUpdate} />}
      {!loading && saving != null && (
        <div className="transactions-screen-container">
          <div className="transactions-screen-title">
            <h1 className="title">Edit Info</h1>
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
                Update Info
              </button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SavingEditInfoScreen;
