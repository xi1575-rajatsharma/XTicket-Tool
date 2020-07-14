import React from "react";
import { Line } from "react-chartjs-2";

const ViolationByDate = ({ ratings }) => {
  const state = {
    chartData: {
      labels: [
        "11 july",
        "12 july",
        "13 july",
        "14 july",
        "15july",
        "16 July",
        "17 july",
        "18july",
        "19 July",
        "20 July",
      ],
      datasets: [
        {
          backgroundColor: "transparent",
          borderColor: "red",
          borderWidth: 2,
          pointColor: "#fff",
          pointStrokeColor: "#ff6c23",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#ff6c23",
          data: [1, 5, 6, 3, 8, 7, 9, 2, 1, 8],
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
            text: "SLA By Date",
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
