import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const AverageEfficiency = () => {
  const state = {
    chartData: {
      labels: ["week1", "week2", "week3", "week4"],
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

          plugins: {
            datalabels: {
              display: true,
              color: "white",
            },
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
            labels: {
              fontColor: "#000000",
              fontSize: 20,
            },
          },
        }}
      />
    </div>
  );
};

export default AverageEfficiency;
