import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HighestExpenses from "../components/transactions/HighestExpenses";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../actions/transactionActions";
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

  const userLogin = useSelector((state) => state.userLogin);

  const {
    loading: loadingTransactions,
    allTransactions,
    error: errorTransactions,
  } = userTransactionsList;

  const {
    loading: loadingSavings,
    savings,
    error: errorSavings,
  } = userSavingsList;

  const {
    loading: loadingUserLogin,
    userInfo,
    error: errorUserLogin,
  } = userLogin;

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getSavings());
  }, [dispatch]);

  return (
    <Layout>
      {(loadingTransactions || loadingSavings || loadingUserLogin) && (
        <Loading />
      )}
      {errorTransactions && <Message error={errorTransactions} />}
      {errorSavings && <Message error={errorSavings} />}
      {errorUserLogin && <Message error={errorUserLogin} />}
      {!loadingTransactions &&
        !loadingSavings &&
        !loadingUserLogin &&
        userInfo != null &&
        savings != null &&
        allTransactions != null && (
          <div className="home-container">
            <div className="home-title">
              <h1 className="title">Dashboard</h1>
              <div className="user-icon">
                <h3>
                  {userInfo.firstName} {userInfo.lastName}
                </h3>
                <div className="user-img"></div>
              </div>
            </div>

            <div className="home-data-overview">
              <div className="home-left">
                <div className="monthly-spending-overview">
                  <h3>Monthly Spending</h3>
                  <LineChart transactions={allTransactions} />
                </div>
                <div className="savings-overview">
                  <h3>Savings</h3>
                  <div className="savings-cards">
                    {savings.slice(0, 3).map((saving) => (
                      <SavingsCard key={saving._id} saving={saving} />
                    ))}
                  </div>
                </div>
              </div>
              <HighestExpenses transactions={allTransactions} />
            </div>
          </div>
        )}
    </Layout>
  );
};

export default HomeScreen;
