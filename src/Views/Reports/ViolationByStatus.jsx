import React from "react";
import { Bar } from "react-chartjs-2";

const ViolationByStatus = () => {
  const state = {
    chartData: {
      labels: ["OPEN", "INPROGRESS", "AWATING", "REVIEW"],
      datasets: [
        {
          data: [1, 5, 6, 3],
        },
      ],
    },
  };

  return (
    <div>
      <Bar
        data={state.chartData}
        height={200}
        options={{
          title: {
            display: true,
            text: "SLA By Status",
            fontSize: 20,
          },
          scales: {
            xAxes: [
              {
                barPercentage: 0.4,
                display: true,
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                gridLines: {
                  display: true,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
        }}
      />
    </div>
  );
};
export default ViolationByStatus;
