import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HighestExpenses from "../components/transactions/HighestExpenses";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/transactionActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const userTransactionsList = useSelector(
    (state) => state.userTransactionsList
  );

  const {
    loading: loadingTransactions,
    transactions,
    error: errorTransactions,
  } = userTransactionsList;

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <Layout>
      {loadingTransactions && <Loading />}
      {errorTransactions && <Message error={errorTransactions} />}
      {!loadingTransactions && transactions != null && (
        <div className="home-container">
          <div className="home-title">
            <h1 className="title">Dashboard</h1>
            <div className="user-icon">
              <h3>John Doe</h3>
              <div className="user-img"></div>
            </div>
          </div>

          <div className="home-data-overview">
            <div className="home-left">
              <div className="monthly-spending-overview">
                <h3>Monthly Spending</h3>
              </div>
              <div className="savings-overview">
                <h3>Savings</h3>
                <div className="savings-cards">
                  <div className="savings-card">
                    <h3>House</h3>
                  </div>
                  <div className="savings-card">
                    <h3>Car</h3>
                  </div>
                  <div className="savings-card">
                    <h3>Shoes</h3>
                  </div>
                </div>
              </div>
            </div>
            <HighestExpenses transactions={transactions} />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default HomeScreen;
