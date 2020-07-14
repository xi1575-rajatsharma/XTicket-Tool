import React from "react";
import { Bar } from "react-chartjs-2";

const AverageEfficiency = () => {
  const state = {
    chartData: {
      labels: ["OPEN", "INPROGRESS", "AWATING", "REVIEW"],
      datasets: [
        {
          data: ["8", "8", "8", "8"],
          backgroundColor: [
            "#32CD32",
            "#FFFF00",
            "#0000CD",
            "#ff471a"
          ],
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
            text: "Average Efficiency",
            // align: "left",
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
                barPercentage: 0.4,
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
export default AverageEfficiency;
