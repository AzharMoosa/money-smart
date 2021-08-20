import React from "react";
import { Doughnut } from "react-chartjs-2";
import { computePercentage } from "../../utils/Utils";

const SavingsCard = ({ saving }) => {
  const TOTAL_PERCENTAGE = 100;

  return (
    <div className="savings-card">
      <h3>{saving.name}</h3>
      <Doughnut
        height={147}
        width={147}
        plugins={[
          {
            beforeDraw: function (chart) {
              var width = chart.width,
                height = chart.height,
                ctx = chart.ctx;
              ctx.restore();
              var fontSize = (height / 120).toFixed(2);
              ctx.font = fontSize + "em Lato";
              ctx.textBaseline = "top";
              var text = `${computePercentage(
                  saving.amountRequired,
                  saving.amountSaved
                )}%`,
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2 - 3;
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
                computePercentage(saving.amountRequired, saving.amountSaved),
                TOTAL_PERCENTAGE -
                  computePercentage(saving.amountRequired, saving.amountSaved),
              ],
              backgroundColor: ["#C9D6DF", "#1E2022"],
              borderWidth: 0,
            },
          ],
        }}
      />
    </div>
  );
};

export default SavingsCard;
