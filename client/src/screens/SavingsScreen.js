import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { FaSortAmountUp } from "react-icons/fa";
import SavingsProgressCard from "../components/savings/SavingsProgressCard";
import { Link } from "react-router-dom";
import { getSavings } from "../actions/savingActions";
import Message from "../components/error/Message";
import Loading from "../components/loading/Loading";
import Paginate from "../components/pagination/Paginate";

const SavingsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userSavingsList = useSelector((state) => state.userSavingsList);
  const { savings, error, loading, page, pages } = userSavingsList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const computePercentage = (amountRequired, amountSaved) => {
    return Math.floor((amountSaved / amountRequired) * 100);
  };

  useEffect(() => {
    dispatch(getSavings(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Message error={error} />}
      <div className="savings-screen-container">
        <div className="savings-screen-title">
          <h1 className="title">Savings</h1>
        </div>
        <div className="savings-nav">
          <Link to="/savings/create">
            <button className="btn-small-dark">New</button>
          </Link>
          <input type="text" placeholder="Search.."></input>
          <div className="filter-icon">
            <FaSortAmountUp />
            <h3>Filter</h3>
          </div>
        </div>

        {!loading &&
          savings.length > 0 &&
          savings.map((saving) => (
            <Link
              key={saving._id}
              className="link"
              to={`/savings/${saving._id}`}
            >
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
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
      </div>
    </Layout>
  );
};

export default SavingsScreen;
