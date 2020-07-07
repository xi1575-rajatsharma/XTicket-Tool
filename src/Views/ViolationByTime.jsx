import React from "react";
import { Line } from "react-chartjs-2";

const ViolationByTime = ({ ratings }) => {
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
          //backgroundColor: "#fff",
          borderColor: "#ff6c23",
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
            text: "Violation By Time",
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

export default ViolationByTime;
