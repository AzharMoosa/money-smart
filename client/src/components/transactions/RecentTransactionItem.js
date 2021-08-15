import React from "react";
import Moment from "react-moment";
import "moment-timezone";

const RecentTransactionItem = ({ date, name, type, price }) => {
  const isToday = (dateGiven) => {
    const today = new Date();
    return (
      dateGiven.getDate() === today.getDate() &&
      dateGiven.getMonth() === today.getMonth() &&
      dateGiven.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="transactions-item">
      <h3 className="transaction-date">
        {isToday(date) ? "Today" : <Moment format="DD/MM">{date}</Moment>}
      </h3>
      <h3 className="transaction-name">{name}</h3>
      <h3 className="transaction-type">{type}</h3>
      <h2 className="transaction-price">£ {parseFloat(price).toFixed(2)}</h2>
    </div>
  );
};

export default RecentTransactionItem;
