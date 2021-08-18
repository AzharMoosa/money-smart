import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout/Layout";
import { FaSortAmountUp, FaSearch } from "react-icons/fa";
import SavingsProgressCard from "../components/savings/SavingsProgressCard";
import { Link } from "react-router-dom";
import { getSavings } from "../actions/savingActions";
import Message from "../components/error/Message";
import SearchResults from "../components/error/SearchResults";
import Loading from "../components/loading/Loading";
import SavingsPaginate from "../components/pagination/SavingsPaginate";

const SavingsScreen = ({ match, history }) => {
  const dispatch = useDispatch();

  const userSavingsList = useSelector((state) => state.userSavingsList);
  const { savings, error, loading, page, pages } = userSavingsList;

  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const sort = match.params.sort || 0;

  const [searchTerm, setSearchTerm] = useState("");

  const computePercentage = (amountRequired, amountSaved) => {
    return Math.floor((amountSaved / amountRequired) * 100);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      history.push(`/savings/search/${searchTerm}`);
    } else {
      history.push(`/savings`);
    }
  };

  useEffect(() => {
    dispatch(getSavings(keyword, pageNumber, sort));
  }, [dispatch, keyword, pageNumber, sort]);

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
          <form onSubmit={searchHandler} className="search-savings">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-box"
              type="text"
              placeholder="Search.."
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          <Link to={`/savings/sort/${1 - sort}`}>
            <div className="filter-icon">
              <FaSortAmountUp />
              <h3>Sort</h3>
            </div>
          </Link>
        </div>

        {!loading &&
          savings != null &&
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
        {savings != null && savings.length === 0 && (
          <SearchResults message={"No Savings Found..."} />
        )}
        <SavingsPaginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : ""}
        />
      </div>
    </Layout>
  );
};

export default SavingsScreen;
