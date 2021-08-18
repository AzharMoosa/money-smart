import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import Dropzone from "../components/dropzone/Dropzone";
import { useDispatch, useSelector } from "react-redux";
import { getReceipts } from "../actions/receiptActions";
import { RECEIPT_CREATE_RESET } from "../constants/receiptConstants";
import { Link } from "react-router-dom";
import RecentTransactionItem from "../components/transactions/RecentTransactionItem";
import Loading from "../components/loading/Loading";
import Message from "../components/error/Message";
import TransactionsPagination from "../components/pagination/TransactionsPagination";

const ReceiptsScreen = ({ match }) => {
  const dispatch = useDispatch();

  const userReceiptsList = useSelector((state) => state.userReceiptsList);

  const {
    loading: loadingGetReceipts,
    receipts,
    error: errorGetReceipts,
    page,
    pages,
  } = userReceiptsList;

  const pageNumber = match.params.pageNumber || 1;

  const receiptCreate = useSelector((state) => state.receiptCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = receiptCreate;

  useEffect(() => {
    if (successCreate) {
      dispatch({
        type: RECEIPT_CREATE_RESET,
      });
    } else {
      dispatch(getReceipts(pageNumber));
    }
  }, [dispatch, successCreate, pageNumber]);

  return (
    <Layout>
      {loadingGetReceipts && <Loading />}
      {errorGetReceipts && <Message error={errorGetReceipts} />}
      {loadingCreate && <Loading />}
      {errorCreate && <Message error={errorCreate} />}
      <div className="receipts-screen-container">
        <div className="receipts-screen-title">
          <h1 className="title">Receipts</h1>
        </div>

        <div className="receipts-dashboard">
          <div className="recent-transactions">
            <div className="recent-transactions-title">
              <h2>Receipt History</h2>
            </div>

            <div className="recent-transactions-list">
              {receipts.map((receipt) => (
                <Link key={receipt._id} to={`receipts/${receipt._id}`}>
                  <RecentTransactionItem
                    date={receipt.date}
                    name={receipt.name}
                    type={receipt.type}
                    price={receipt.amount}
                  />
                </Link>
              ))}
              <TransactionsPagination pages={pages} page={page} />
            </div>
          </div>

          <div className="receipt-upload">
            <h3>Add New Receipt</h3>
            <Dropzone />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReceiptsScreen;
