import React from "react";
import { Line } from "react-chartjs-2";

const ViolationByDate = ({ statusByDate }) => {

  const dates = statusByDate.map(xLabel => {
    const dateObj = new Date(xLabel.localDateTime)
    return (
      xLabel.localDateTime
    )
  })
  const misses = statusByDate.map(yLabel => yLabel.missedCount);
  const state = {
    chartData: {
      labels: dates,
      datasets: [
        {
          backgroundColor: "transparent",
          borderColor: "#ff6c23",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
          data: misses
        },
      ],
    },
  };

  return (
    <div>
      <Line
        data={state.chartData}
        height={100}
        options={{
          title: {
            display: true,
            text: "Missed SLA Trend",
            fontSize: 20,
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};

export default ViolationByDate;
