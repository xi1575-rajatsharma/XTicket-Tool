import React from "react";
import { Pie } from "react-chartjs-2";

const PieChart = () => {
  const state = {
    chartData: {
      labels: ["SLA Met", "SLA Missed"],
      datasets: [
        {
          label: "Population",
          data: [3, 9],
          backgroundColor: [`#FFA500`, `#6495ED`],
        },
      ],
    },
  };

  return (
    <div>
      <Pie
        data={state.chartData}
        options={{
          title: {
            display: true,
            text: "SLA track - June 2020",
            fontSize: 25,
          },
          legend: {
            display: true,
            position: "bottom",
          },
          rotation: Math.PI * -0.1,
        }}
      />
    </div>
  );
};

export default PieChart;
