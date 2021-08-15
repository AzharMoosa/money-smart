import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { FaSortAmountUp } from "react-icons/fa";
import SavingsProgressCard from "../components/savings/SavingsProgressCard";
import { Link } from "react-router-dom";
import { getSavings } from "../actions/savingActions";
import Message from "../components/error/Message";

const SavingsScreen = () => {
  const dispatch = useDispatch();

  const userSavingsList = useSelector((state) => state.userSavingsList);
  const { savings, error, loading } = userSavingsList;

  const computePercentage = (amountRequired, amountSaved) => {
    return Math.ceil((amountSaved / amountRequired) * 100);
  };

  useEffect(() => {
    dispatch(getSavings());
  }, [dispatch]);

  return (
    <Layout>
      <div className="savings-screen-container">
        <div className="savings-screen-title">
          <h1 className="title">Savings</h1>
        </div>
        <div className="savings-nav">
          <button className="btn-small-dark">New</button>
          <input type="text" placeholder="Search.."></input>
          <div className="filter-icon">
            <FaSortAmountUp />
            <h3>Filter</h3>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        {error && <Message error={error} />}

        {!loading &&
          savings.length > 0 &&
          savings.map((saving) => (
            <Link className="link" to={`/savings/${saving._id}`}>
              <SavingsProgressCard
                title={saving.name}
                amount={saving.amountRequired}
                percentage={computePercentage(
                  saving.amountRequired,
                  saving.amountSaved
                )}
              />
            </Link>
          ))}

        <div className="pagination">
          <h3>Previous</h3>
          <div className="pages">
            <h4>1 | 2 | 3</h4>
            <h3>Next</h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavingsScreen;
