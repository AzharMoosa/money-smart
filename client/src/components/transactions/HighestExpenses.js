import React from "react";

const HighestExpenses = ({ height }) => {
  return (
    <div style={{ height: height }} className="highest-expense-overview">
      <h3>Highest Expenses</h3>
    </div>
  );
};

HighestExpenses.defaultProps = {
  height: 858,
};

export default HighestExpenses;
