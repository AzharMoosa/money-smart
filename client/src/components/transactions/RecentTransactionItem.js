import React from "react";
import Moment from "react-moment";
import "moment-timezone";

const RecentTransactionItem = ({ date, name, type, price }) => {
  const dateSplit = date.split("/");
  const dateString = new Date(
    `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`
  );

  const isToday = () => {
    const today = new Date();
    return (
      dateString.getDate() === today.getDate() &&
      dateString.getMonth() === today.getMonth() &&
      dateString.getFullYear() === today.getFullYear()
    );
  };

  return (
    <div className="transactions-item">
      <h3 className="transaction-date">
        {isToday() ? "Today" : <Moment format="DD/MM">{dateString}</Moment>}
      </h3>
      <h3 className="transaction-name">{name}</h3>
      <h3 className="transaction-type">{type}</h3>
      <h2 className="transaction-price">£ {parseFloat(price).toFixed(2)}</h2>
    </div>
  );
};

export default RecentTransactionItem;
