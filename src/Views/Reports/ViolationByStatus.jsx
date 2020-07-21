import React from "react";
import { Bar } from "react-chartjs-2";

const ViolationByStatus = ({ status }) => {
  const statusData = status ? status.map((data) => data.status) : null;
  const countData = status ? status.map((data) => data.count) : null;


  const state = {
    chartData: {
      labels: statusData,
      datasets: [
        {
          data: countData,
          backgroundColor: [
            "#32CD32",
            "#ffbf00",
            "#FFFF00",
            "#0000CD",
            "#DC143C",
            "#ff471a",
            "#333300",
            "#008fb3",
          ]
        }
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
            text: "SLA's Missed By Status",
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
                stacked: true
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
