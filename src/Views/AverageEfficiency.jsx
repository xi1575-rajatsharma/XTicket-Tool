import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const AverageEfficiency = () => {
  const state = {
    chartData: {
      labels: ["week1", "week2", "week3", "week4"],
      datasets: [
        {
          data: ["9", "4", "7", "9"],
          backgroundColor: [
            "#32CD32",
            "#FFFF00",
            "#0000CD",
            "#ff471a",
            "#008fb3",
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
            align: "left",
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
                display: false,
                gridLines: {
                  display: false,
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
