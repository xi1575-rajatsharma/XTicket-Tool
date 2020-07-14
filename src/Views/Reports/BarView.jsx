import React from "react";
import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const BarView = ({ statusData }) => {
  console.log(statusData);
  const xlabel = Object.keys(statusData);
  const ylabel = Object.values(statusData);

  const state = {
    chartData: {
      labels: xlabel,
      datasets: [
        {
          data: ylabel,
          backgroundColor: [
            "#32CD32",
            "#ffbf00",
            "#FFFF00",
            "#0000CD",
            "#DC143C",
            "#ff471a",
            "#333300",
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
        height={130}
        // width="500px"
        // margin="none"
        options={{
          // responsive: true,
          // aspectRatio: 2,
          // maintainAspectRatio: true,
          title: {
            display: true,
            text: "Tickets Status",
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

export default BarView;
