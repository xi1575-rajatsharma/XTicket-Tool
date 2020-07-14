import React from "react";
import { Doughnut } from "react-chartjs-2";

const AchievedVsViolated = () => {
  const state = {
    chartData: {
      labels: ["Achieved", "violated"],
      datasets: [
        {
          data: ["12", "3"],
          backgroundColor: [" #4040a1", "#d64161"],
        },
      ],
    },
  };

  return (
    <div>
      <Doughnut
        data={state.chartData}
        height={200}
        options={{
          title: {
            display: true,
            text: "Achieved vs Violated",
            fontSize: 20,
            align: "right",
          },
          cutoutPercentage: 80,
          legend: {
            display: true,
            position: "bottom",
            labels: {
              fontColor: "#000000",
              fontSize: 10,
            },
          },
        }}
      />
    </div>
  );
};

export default AchievedVsViolated;
