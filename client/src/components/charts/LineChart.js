import React from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ transactions }) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const computeData = () => {
    const groups = transactions.reduce((groups, transaction) => {
      const date = transaction.date.split("/")[1];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});

    const months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
    ];

    const monthlyPayments = months.map((month) => {
      return {
        month,
        totalAmount: groups[month]
          ? groups[month].reduce((a, b) => a + (b["amount"] || 0), 0)
          : 0,
      };
    });

    monthlyPayments.sort(function (a, b) {
      return a.date - b.date;
    });

    return monthlyPayments.map((a) => a.totalAmount);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        data: computeData(),
        borderColor: "#4BC0C0",
      },
    ],
  };
  const options = {
    responsive: false,
    maintainAspectRatio: true,
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel;
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Line data={data} options={options} height={270.5} width={834.5} />
    </>
  );
};

export default LineChart;
