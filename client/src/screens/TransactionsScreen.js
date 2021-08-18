import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HighestExpenses from "../components/transactions/HighestExpenses";
import RecentTransactionItem from "../components/transactions/RecentTransactionItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/error/Message";
import Loading from "../components/loading/Loading";
import { getTransactions } from "../actions/transactionActions";
import TransactionsPagination from "../components/pagination/TransactionsPagination";
const TransactionsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userTransactionsList = useSelector(
    (state) => state.userTransactionsList
  );

  const { loading, transactions, allTransactions, error, page, pages } =
    userTransactionsList;

  const pageNumber = match.params.pageNumber || 1;

  useEffect(() => {
    dispatch(getTransactions(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <Layout>
      {loading && <Loading />}
      {error && <Message error={error} />}
      <div className="transactions-screen-container">
        <div className="transactions-screen-title">
          <h1 className="title">Transactions</h1>
        </div>

        <div className="transactions-dashboard">
          <div className="recent-transactions">
            <div className="recent-transactions-title">
              <h2>Recent Transactions</h2>
              <Link to="/add-transaction">
                <button className="btn-medium-dark">Add</button>
              </Link>
            </div>

            <div className="recent-transactions-list">
              {transactions.map((transaction) => (
                <Link
                  key={transaction._id}
                  to={`transactions/${transaction._id}`}
                >
                  <RecentTransactionItem
                    date={transaction.date}
                    name={transaction.name}
                    type={transaction.type}
                    price={transaction.amount}
                  />
                </Link>
              ))}
              <TransactionsPagination pages={pages} page={page} />
            </div>
          </div>
          <HighestExpenses transactions={allTransactions} height={905} />
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsScreen;
