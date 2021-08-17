import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HighestExpenses from "../components/transactions/HighestExpenses";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/transactionActions";
import { getUserDetails } from "../actions/userActions";
import { getSavings } from "../actions/savingActions";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import SavingsCard from "../components/savings/SavingsCard";
import LineChart from "../components/charts/LineChart";

const HomeScreen = () => {
  const dispatch = useDispatch();

  const userTransactionsList = useSelector(
    (state) => state.userTransactionsList
  );

  const userSavingsList = useSelector((state) => state.userSavingsList);

  const userDetails = useSelector((state) => state.userDetails);

  const {
    loading: loadingTransactions,
    transactions,
    error: errorTransactions,
  } = userTransactionsList;

  const {
    loading: loadingSavings,
    savings,
    error: errorSavings,
  } = userSavingsList;

  const {
    loading: loadingUserDetails,
    user,
    error: errorUserDetails,
  } = userDetails;

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getSavings());
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <Layout>
      {loadingTransactions && <Loading />}
      {errorTransactions && <Message error={errorTransactions} />}
      {loadingSavings && <Loading />}
      {errorSavings && <Message error={errorSavings} />}
      {loadingUserDetails && <Loading />}
      {errorUserDetails && <Message error={errorUserDetails} />}
      {!loadingTransactions &&
        !loadingSavings &&
        !loadingUserDetails &&
        user != null &&
        savings != null &&
        transactions != null && (
          <div className="home-container">
            <div className="home-title">
              <h1 className="title">Dashboard</h1>
              <div className="user-icon">
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                <div className="user-img"></div>
              </div>
            </div>

            <div className="home-data-overview">
              <div className="home-left">
                <div className="monthly-spending-overview">
                  <h3>Monthly Spending</h3>
                  <LineChart transactions={transactions} />
                </div>
                <div className="savings-overview">
                  <h3>Savings</h3>
                  <div className="savings-cards">
                    {savings.slice(0, 3).map((saving) => (
                      <SavingsCard saving={saving} />
                    ))}
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
