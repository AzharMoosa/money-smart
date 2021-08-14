import React from "react";
import ProgressBar from "../ProgressBar";

const SavingsProgressCard = ({ title, amount, percentage }) => {
  return (
    <div className="savings-progress">
      <div className="savings-progress-title">
        <h4>{title}</h4>
        <h3>£ {amount}</h3>
      </div>
      <div className="savings-progress-bar">
        <ProgressBar percentage={percentage} />
      </div>
    </div>
  );
};

export default SavingsProgressCard;
