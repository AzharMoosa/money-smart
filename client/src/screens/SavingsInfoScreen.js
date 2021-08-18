import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteSaving, getSaving } from "../actions/savingActions";
import Message from "../components/error/Message";
import { Doughnut } from "react-chartjs-2";
import Loading from "../components/loading/Loading";
import StackedBar from "../components/charts/StackedBar";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { SAVING_DELETE_RESET } from "../constants/savingConstants";

const SavingsInfoScreen = ({ match, history }) => {
  const savingId = match.params.id;
  const dispatch = useDispatch();
  const PAGE_SIZE = 4;
  const [historyPage, setHistoryPage] = useState(1);
  const [pages, setPages] = useState(0);

  const savingDetails = useSelector((state) => state.savingDetails);
  const { saving, loading, error } = savingDetails;

  const savingDelete = useSelector((state) => state.savingDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = savingDelete;

  const TOTAL_PERCENTAGE = 100;

  useEffect(() => {
    if (successDelete) {
      dispatch({
        type: SAVING_DELETE_RESET,
      });
      history.push("/savings");
    } else if (!saving || !saving.name || saving._id !== savingId) {
      dispatch(getSaving(savingId));
    } else {
      setPages(saving.history.length / PAGE_SIZE);
    }
  }, [history, successDelete, dispatch, savingId, saving]);

  const computePercentage = (amountRequired, amountSaved) => {
    const percentage = Math.floor(
      (amountSaved / amountRequired) * TOTAL_PERCENTAGE
    );
    return percentage > TOTAL_PERCENTAGE ? TOTAL_PERCENTAGE : percentage;
  };

  const deleteSavingHandler = (name, id) => {
    confirmAlert({
      title: `Delete ${name}`,
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(deleteSaving(id));
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const paginate = (array) => {
    return array.slice((historyPage - 1) * PAGE_SIZE, historyPage * PAGE_SIZE);
  };

  return (
    <Layout>
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      {errorDelete && <Message error={errorDelete} />}
      <div className="savings-info-container">
        {error && <Message error={error} />}
        {!loading && saving != null && (
          <div>
            <div className="savings-info-title">
              <h1 className="title">{saving.name}</h1>
              <h1 className="title">£ {saving.amountRequired}</h1>
            </div>
            <div className="savings-info-nav">
              <Link to={`/savings/${saving._id}`}>
                <h4>View Info</h4>
              </Link>
              <Link to={`/savings/add/${saving._id}`}>
                <h4>Add Amount</h4>
              </Link>
              <Link to={`/savings/edit/${saving._id}`}>
                <h4>Edit Info</h4>
              </Link>
              <h4 onClick={() => deleteSavingHandler(saving.name, saving._id)}>
                Delete Info
              </h4>
            </div>
            <div className="savings-info-layout">
              <div className="savings-info-progress">
                <Doughnut
                  height={189}
                  width={189}
                  plugins={[
                    {
                      beforeDraw: function (chart) {
                        var width = chart.width,
                          height = chart.height,
                          ctx = chart.ctx;
                        ctx.restore();
                        var fontSize = (height / 140).toFixed(2);
                        ctx.font = fontSize + "em Lato";
                        ctx.textBaseline = "top";
                        var text = `${computePercentage(
                            saving.amountRequired,
                            saving.amountSaved
                          )}%`,
                          textX = Math.round(
                            (width - ctx.measureText(text).width) / 2
                          ),
                          textY = height / 2 - 6;
                        ctx.fillText(text, textX, textY);
                        ctx.save();
                      },
                    },
                  ]}
                  options={{
                    tooltip: false,
                    responsive: false,
                    maintainAspectRatio: true,
                  }}
                  data={{
                    maintainAspectRatio: false,
                    responsive: false,
                    datasets: [
                      {
                        data: [
                          computePercentage(
                            saving.amountRequired,
                            saving.amountSaved
                          ),
                          TOTAL_PERCENTAGE -
                            computePercentage(
                              saving.amountRequired,
                              saving.amountSaved
                            ),
                        ],
                        backgroundColor: ["#4BC0C0", "#52616B"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                />
                <div className="savings-info-progress-saved">
                  <h3>Current Saved</h3>
                  <h4>
                    £
                    {saving.amountSaved > saving.amountRequired
                      ? saving.amountRequired
                      : saving.amountSaved}
                  </h4>
                </div>
                <div className="savings-info-progress-left">
                  <h3>Amount Left</h3>
                  <h4>
                    £
                    {saving.amountSaved > saving.amountRequired
                      ? 0
                      : saving.amountRequired - saving.amountSaved}
                  </h4>
                </div>
                <div className="savings-info-progress-total">
                  <h3>Total Required</h3>
                  <h4>£ {saving.amountRequired}</h4>
                </div>
              </div>
              <div className="savings-info-payments">
                <h3>Monthly Payments</h3>
                <StackedBar saving={saving} />
              </div>
              <div className="savings-info-history">
                <h3>History</h3>
                <div className="savings-info-history-list">
                  {paginate(saving.history).map((transaction) => (
                    <div
                      key={transaction._id}
                      className="savings-info-history-item"
                    >
                      <h4>{transaction.date}</h4>
                      <h3>£ {transaction.amount}</h3>
                    </div>
                  ))}
                  {pages > 1 && (
                    <>
                      <div className="history-pagination">
                        <h3 onClick={() => setHistoryPage(historyPage - 1)}>
                          {historyPage > 1 ? "Previous" : ""}
                        </h3>

                        <h3 onClick={() => setHistoryPage(historyPage + 1)}>
                          {historyPage < pages ? "Next" : ""}
                        </h3>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="savings-info-info">
                <h3>Info</h3>
                <div className="savings-info-desc">
                  <h3>Description</h3>
                  <p>{saving.description}</p>
                </div>
                <div className="savings-info-deadline">
                  <h3>Deadline</h3>
                  <p>{saving.deadline}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SavingsInfoScreen;
