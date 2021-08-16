import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getSaving } from "../actions/savingActions";
import Message from "../components/error/Message";
import { Doughnut } from "react-chartjs-2";

const SavingsInfoScreen = ({ match }) => {
  const dispatch = useDispatch();

  const savingDetails = useSelector((state) => state.savingDetails);
  const { saving, loading, error } = savingDetails;

  useEffect(() => {
    dispatch(getSaving(match.params.id));
  }, [dispatch, match]);

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ["#4BC0C0", "#52616B"],
        borderWidth: 0,
      },
    ],
  };

  const plugins = [
    {
      beforeDraw: function (chart) {
        var width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        var fontSize = (height / 140).toFixed(2);
        ctx.font = fontSize + "em Lato";
        ctx.textBaseline = "top";
        var text = "60%",
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2 - 6;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

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
              <div className="savings-info-progress">
                <Doughnut
                  height={189}
                  width={189}
                  data={data}
                  plugins={plugins}
                  options={{
                    tooltip: false,
                    responsive: false,
                    maintainAspectRatio: true,
                  }}
                />
                <div className="savings-info-progress-saved">
                  <h3>Current Saved</h3>
                  <h4>£ {saving.amountSaved}</h4>
                </div>
                <div className="savings-info-progress-left">
                  <h3>Amount Left</h3>
                  <h4>£ {saving.amountRequired - saving.amountSaved}</h4>
                </div>
                <div className="savings-info-progress-total">
                  <h3>Total Required</h3>
                  <h4>£ {saving.amountRequired}</h4>
                </div>
              </div>
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
