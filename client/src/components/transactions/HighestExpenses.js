import React from "react";
import { Pie } from "react-chartjs-2";

const HighestExpenses = ({ height, transactions }) => {
  const computeData = (isLabel) => {
    const groups = transactions.reduce((groups, transaction) => {
      const type = transaction.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(transaction);
      return groups;
    }, {});

    const expenses = Object.keys(groups).map((type) => {
      return {
        type,
        totalAmount: groups[type].reduce((a, b) => a + (b["amount"] || 0), 0),
      };
    });

    expenses.sort(function (a, b) {
      return b.totalAmount - a.totalAmount;
    });

    if (isLabel) {
      return expenses.map((a) => a.type);
    } else {
      return expenses.map((a) => a.totalAmount).splice(0, 5);
    }
  };

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: computeData(true),
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: [
          "#36a2eb",
          "#4BC0C0",
          "#FFCD56",
          "#FF6384",
          "#FF9F40",
        ],
        borderColor: "#1E2022",
        borderWidth: 2,
        data: computeData(false),
      },
    ],
  };
  return (
    <div style={{ height: height }} className="highest-expense-overview">
      <h3>Highest Expenses</h3>
      <Pie
        height={426}
        width={426}
        className="highest-expense-piechart"
        data={data}
        options={{
          tooltip: false,
          responsive: false,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              display: false,
              position: "bottom",
            },
            title: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

HighestExpenses.defaultProps = {
  height: 858,
  transactions: [],
};

export default HighestExpenses;
