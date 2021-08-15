import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaving } from "../actions/savingActions";
import Message from "../components/error/Message";

const SavingsInfoScreen = ({ match }) => {
  const dispatch = useDispatch();

  const savingDetails = useSelector((state) => state.savingDetails);
  const { saving, loading, error } = savingDetails;

  useEffect(() => {
    dispatch(getSaving(match.params.id));
  }, [dispatch, match]);

  return (
    <Layout>
      <div className="savings-info-container">
        {loading && <p>Loading...</p>}
        {error && <Message error={error} />}
        {!loading && saving != null && (
          <div>
            <div className="savings-info-title">
              <h1 className="title">{saving.name}</h1>
              <h1 className="title">£ {saving.amountRequired}</h1>
            </div>
            <div className="savings-info-nav">
              <h4>View Info</h4>
              <h4>Add Amount</h4>
              <h4>Edit Info</h4>
              <h4>Delete Info</h4>
            </div>
            <div className="savings-info-layout">
              <div className="savings-info-progress"></div>
              <div className="savings-info-payments">
                <h3>Monthly Payments</h3>
              </div>
              <div className="savings-info-history">
                <h3>History</h3>
              </div>
              <div className="savings-info-info">
                <h3>Info</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavingsInfoScreen;
